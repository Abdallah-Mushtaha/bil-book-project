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

import { POST } from './route'
import { supabase } from '@/lib/supabase'

describe('POST /api/create-order', () => {
  beforeEach(() => vi.clearAllMocks())

  it('يرفض الطلب لو المستخدم اشترى الكتاب مسبقاً', async () => {
    // 1. mock فحص الشراء السابق -> موجود
    const maybeSingle = vi.fn().mockResolvedValue({ data: { id: 1 }, error: null })
    const eq2 = vi.fn().mockReturnValue({ maybeSingle })
    const eq1 = vi.fn().mockReturnValue({ eq: eq2 })
    const select = vi.fn().mockReturnValue({ eq: eq1 })
    vi.mocked(supabase.from).mockReturnValue({ select } as any)

    const req = new NextRequest('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ email: 'a@a.com', userId: 'user_123' }),
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBe('You already own this book')
  })
})