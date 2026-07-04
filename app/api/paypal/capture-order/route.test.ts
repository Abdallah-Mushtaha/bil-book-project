import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

global.fetch = vi.fn()

import { POST } from './route'
import { supabase } from '@/lib/supabase'

function makeRequest(body: any) {
  return new NextRequest('http://localhost/api/capture-order', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

describe('POST /api/capture-order', () => {
  beforeEach(() => vi.clearAllMocks())

  it('ينجح ويحدّث حالة الطلب لما PayPal يرجع COMPLETED', async () => {
    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ json: async () => ({ access_token: 'fake_token' }) } as any) // access token
      .mockResolvedValueOnce({ json: async () => ({ status: 'COMPLETED' }) } as any) // capture

    const eq = vi.fn().mockResolvedValue({ error: null })
    const update = vi.fn().mockReturnValue({ eq })
    vi.mocked(supabase.from).mockReturnValue({ update } as any)

    const res = await POST(makeRequest({ orderId: 'ORDER_123' }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(update).toHaveBeenCalledWith({ status: 'completed' })
  })

  it('يرجع فشل لو PayPal ما رجع COMPLETED (مثلاً الدفع اتلغى)', async () => {
    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ json: async () => ({ access_token: 'fake_token' }) } as any)
      .mockResolvedValueOnce({ json: async () => ({ status: 'DECLINED' }) } as any)

    const res = await POST(makeRequest({ orderId: 'ORDER_123' }))
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.success).toBe(false)
  })

  it('يرجع خطأ 500 لو تحديث قاعدة البيانات فشل بعد نجاح الدفع', async () => {
    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ json: async () => ({ access_token: 'fake_token' }) } as any)
      .mockResolvedValueOnce({ json: async () => ({ status: 'COMPLETED' }) } as any)

    const eq = vi.fn().mockResolvedValue({ error: { message: 'DB connection lost' } })
    const update = vi.fn().mockReturnValue({ eq })
    vi.mocked(supabase.from).mockReturnValue({ update } as any)

    const res = await POST(makeRequest({ orderId: 'ORDER_123' }))
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data.error).toBe('Database update failed')
  })
})