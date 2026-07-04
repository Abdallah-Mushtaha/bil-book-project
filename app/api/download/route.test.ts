import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}))


const mockSupabaseAdmin = {
  from: vi.fn(),
  storage: { from: vi.fn() },
}

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabaseAdmin),
}))

import { GET } from './route'
import { auth } from '@clerk/nextjs/server'

function mockOrderChain(returnValue: any) {
  const single = vi.fn().mockResolvedValue(returnValue)
  const eq3 = vi.fn().mockReturnValue({ single })
  const eq2 = vi.fn().mockReturnValue({ eq: eq3 })
  const eq1 = vi.fn().mockReturnValue({ eq: eq2 })
  const select = vi.fn().mockReturnValue({ eq: eq1 })
  return { select }
}

function makeRequest(orderId: string | null) {
  const url = orderId
    ? `http://localhost/api/download?orderId=${orderId}`
    : 'http://localhost/api/download'
  return new NextRequest(url)
}

describe('GET /api/download', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.FALLBACK_URL = 'http://localhost/error'
  })

  it('يوجه للـ fallback لو المستخدم مش مسجل دخول', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: null } as any)

    const res = await GET(makeRequest('ORDER_123'))

    expect(res.status).toBe(307) 
    expect(res.headers.get('location')).toBe('http://localhost/error')
  })

  it('يوجه للـ fallback لو الطلب مش تبع نفس المستخدم (IDOR — الحالة يلي صلحناها)', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' } as any)
    mockSupabaseAdmin.from.mockReturnValue(mockOrderChain({ data: null, error: null }) as any)

    const res = await GET(makeRequest('ORDER_BELONGS_TO_SOMEONE_ELSE'))

    expect(res.headers.get('location')).toBe('http://localhost/error')
  })

  it('ينجح ويرجع رابط التحميل لو كل شي تمام', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' } as any)
    mockSupabaseAdmin.from.mockReturnValue(
      mockOrderChain({ data: { status: 'completed' }, error: null }) as any
    )

    const createSignedUrl = vi.fn().mockResolvedValue({
      data: { signedUrl: 'https://signed-url.example.com/book.pdf' },
      error: null,
    })
    mockSupabaseAdmin.storage.from.mockReturnValue({ createSignedUrl })

    const res = await GET(makeRequest('ORDER_123'))

    expect(res.headers.get('location')).toBe('https://signed-url.example.com/book.pdf')
  })

  it('يوجه للـ fallback لو فشل توليد الرابط الموقّع (signed URL)', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' } as any)
    mockSupabaseAdmin.from.mockReturnValue(
      mockOrderChain({ data: { status: 'completed' }, error: null }) as any
    )

    const createSignedUrl = vi.fn().mockResolvedValue({ data: null, error: { message: 'storage error' } })
    mockSupabaseAdmin.storage.from.mockReturnValue({ createSignedUrl })

    const res = await GET(makeRequest('ORDER_123'))

    expect(res.headers.get('location')).toBe('http://localhost/error')
  })
})