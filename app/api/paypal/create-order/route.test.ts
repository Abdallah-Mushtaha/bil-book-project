import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'


vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn().mockResolvedValue({ userId: 'user_123' }),
}))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

global.fetch = vi.fn()

import { POST } from './route'
import { supabase } from '@/lib/supabase'

function mockSelectChain(returnValue: any) {
  const maybeSingle = vi.fn().mockResolvedValue(returnValue)
  const eq2 = vi.fn().mockReturnValue({ maybeSingle })
  const eq1 = vi.fn().mockReturnValue({ eq: eq2 })
  const select = vi.fn().mockReturnValue({ eq: eq1 })
  return { select }
}

function makeRequest(body: any) {
  return new NextRequest('http://localhost/api/create-order', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

describe('POST /api/create-order', () => {
  beforeEach(() => vi.clearAllMocks())

  it('يرفض الطلب لو المستخدم اشترى الكتاب مسبقاً', async () => {
    vi.mocked(supabase.from).mockReturnValue(
      mockSelectChain({ data: { id: 1 }, error: null }) as any
    )

    const res = await POST(makeRequest({ email: 'a@a.com', userId: 'user_123' }))
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBe('You already own this book')
  })

  it('يرجع خطأ لو PayPal فشل بإنشاء الطلب (ما رجع order.id)', async () => {
    vi.mocked(supabase.from).mockReturnValue(
      mockSelectChain({ data: null, error: null }) as any
    )

    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ json: async () => ({ access_token: 'fake_token' }) } as any)
      .mockResolvedValueOnce({ json: async () => ({ error: 'invalid_request' }) } as any) // بدون id

    const res = await POST(makeRequest({ email: 'a@a.com', userId: 'user_123' }))
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data.error).toBe('PayPal order creation failed')
  })

  it('ينجح بإنشاء الطلب لما كل شي تمام', async () => {
    vi.mocked(supabase.from).mockReturnValue(
      mockSelectChain({ data: null, error: null }) as any
    )

    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ json: async () => ({ access_token: 'fake_token' }) } as any)
      .mockResolvedValueOnce({ json: async () => ({ id: 'ORDER_ABC123' }) } as any)

    const insert = vi.fn().mockResolvedValue({ error: null })
    vi.mocked(supabase.from)
      .mockReturnValueOnce(mockSelectChain({ data: null, error: null }) as any) 
      .mockReturnValueOnce({ insert } as any)

    const res = await POST(makeRequest({ email: 'a@a.com', userId: 'user_123' }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.orderId).toBe('ORDER_ABC123')
  })
})