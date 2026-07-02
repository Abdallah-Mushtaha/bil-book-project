import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'

// mock كامل لـ Clerk — بدل ما نتصل بالخدمة الحقيقية
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}))

// mock كامل لـ Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

describe('GET /api/check-purchase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('يرجع purchased: false لو المستخدم مش مسجل دخول', async () => {
    // نتحكم بشو auth() رح ترجع بهاد الـ test تحديداً
    vi.mocked(auth).mockResolvedValue({ userId: null } as any)

    const res = await GET()
    const data = await res.json()

    expect(data.purchased).toBe(false)
  })

  it('يرجع purchased: true لو عنده طلب completed', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' } as any)

    // نبني mock لسلسلة .from().select().eq().eq().maybeSingle()
    const maybeSingle = vi.fn().mockResolvedValue({ data: { id: 1 }, error: null })
    const eq2 = vi.fn().mockReturnValue({ maybeSingle })
    const eq1 = vi.fn().mockReturnValue({ eq: eq2 })
    const select = vi.fn().mockReturnValue({ eq: eq1 })
    vi.mocked(supabase.from).mockReturnValue({ select } as any)

    const res = await GET()
    const data = await res.json()

    expect(data.purchased).toBe(true)
  })
})