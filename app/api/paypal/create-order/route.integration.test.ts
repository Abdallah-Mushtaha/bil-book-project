import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { supabaseTest } from '@/lib/supabase-test-client'

vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn().mockResolvedValue({ userId: 'test_user_integration' }),
}))

vi.mock('@/lib/supabase', () => ({
  supabase: supabaseTest,
}))

import { POST } from './route'

const TEST_ORDER_ID = 'INTEGRATION_TEST_ORDER_001'

describe('POST /api/create-order (Integration)', () => {
  const originalFetch = global.fetch 

  afterEach(async () => {
    await supabaseTest.from('orders').delete().eq('paypal_order_id', TEST_ORDER_ID)
    vi.restoreAllMocks() 
  })

  it('ينشئ طلب فعلي بقاعدة بيانات الاختبار الحقيقية', async () => {
    
    vi.spyOn(global, 'fetch').mockImplementation(async (url, options) => {
      const urlString = url.toString()

      if (urlString.includes('paypal.com')) {
        if (urlString.includes('oauth2/token')) {
          return { json: async () => ({ access_token: 'fake_token' }) } as any
        }
        if (urlString.includes('/checkout/orders')) {
          return { json: async () => ({ id: TEST_ORDER_ID }) } as any
        }
      }

      return originalFetch(url, options)
    })

    const req = new NextRequest('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ email: 'integration-test@test.com', userId: 'test_user_integration' }),
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.orderId).toBe(TEST_ORDER_ID)

    const { data: order } = await supabaseTest
      .from('orders')
      .select('*')
      .eq('paypal_order_id', TEST_ORDER_ID)
      .single()

    expect(order).not.toBeNull()
    expect(order?.status).toBe('pending')
  })
})