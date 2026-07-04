import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { supabaseTest } from '@/lib/supabase-test-client'

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}))

vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL_TEST!)
vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY_TEST!)

const { auth } = await import('@clerk/nextjs/server')
const { GET } = await import('./route')

const TEST_ORDER_ID = 'INTEGRATION_DOWNLOAD_ORDER_001'
const TEST_USER_ID = 'test_user_download_integration'
const FALLBACK_URL = process.env.FALLBACK_URL!

function makeRequest(params: Record<string, string>) {
  const url = new URL('http://localhost/api/download')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return new NextRequest(url)
}

describe('GET /api/download (Integration)', () => {
  beforeAll(async () => {
    const { data: buckets } = await supabaseTest.storage.listBuckets()
    const exists = buckets?.some((b) => b.name === 'books')

    if (!exists) {
      const { error: bucketError } = await supabaseTest.storage.createBucket('books', {
        public: true,
      })
      if (bucketError) throw new Error(`فشل إنشاء bucket: ${bucketError.message}`)
    }

    const { error: uploadError } = await supabaseTest.storage
      .from('books')
      .upload('because-i-loved.pdf', Buffer.from('dummy pdf content'), {
        contentType: 'application/pdf',
        upsert: true,
      })
    if (uploadError) throw new Error(`فشل رفع الملف: ${uploadError.message}`)
  })

  afterAll(async () => {
    await supabaseTest.storage.from('books').remove(['because-i-loved.pdf'])
    vi.unstubAllEnvs()
  })

  afterEach(async () => {
    await supabaseTest.from('orders').delete().eq('paypal_order_id', TEST_ORDER_ID)
    vi.clearAllMocks()
  })

  it('يرجّع redirect لفولباك لو ما في userId', async () => {
    ;(auth as any).mockResolvedValue({ userId: null })

    const res = await GET(makeRequest({ orderId: TEST_ORDER_ID }))

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe(FALLBACK_URL)
  })

  it('يرجّع redirect لفولباك لو ما في orderId', async () => {
    ;(auth as any).mockResolvedValue({ userId: TEST_USER_ID })

    const res = await GET(makeRequest({}))

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe(FALLBACK_URL)
  })

  it('يرجّع redirect لفولباك لو الطلب مش موجود', async () => {
    ;(auth as any).mockResolvedValue({ userId: TEST_USER_ID })

    const res = await GET(makeRequest({ orderId: 'NON_EXISTENT_ORDER' }))

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe(FALLBACK_URL)
  })

  it('يرجّع redirect لفولباك لو الطلب موجود بس مش completed', async () => {
    ;(auth as any).mockResolvedValue({ userId: TEST_USER_ID })

    await supabaseTest.from('orders').insert({
      email: 'integration-test@test.com',
      user_id: TEST_USER_ID,
      paypal_order_id: TEST_ORDER_ID,
      status: 'pending',
    })

    const res = await GET(makeRequest({ orderId: TEST_ORDER_ID }))

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe(FALLBACK_URL)
  })

  it('يرجّع redirect لرابط تحميل موقّع حقيقي لما كل شي صحيح', async () => {
    ;(auth as any).mockResolvedValue({ userId: TEST_USER_ID })

    await supabaseTest.from('orders').insert({
      email: 'integration-test@test.com',
      user_id: TEST_USER_ID,
      paypal_order_id: TEST_ORDER_ID,
      status: 'completed',
    })

    const res = await GET(makeRequest({ orderId: TEST_ORDER_ID }))
    const location = res.headers.get('location')!

    expect(res.status).toBe(307)
    expect(location).toContain('because-i-loved.pdf')
    expect(location).toContain('token=')
  })
})