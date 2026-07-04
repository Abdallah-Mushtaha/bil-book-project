import { describe, it, expect, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { supabaseTest } from '@/lib/supabase-test-client'

vi.mock('@/lib/supabase', () => ({
  supabase: supabaseTest,
}))

import { POST } from './route'

const TEST_ORDER_ID = 'INTEGRATION_CAPTURE_ORDER_001'

function makeRequest(body: any) {
  return new NextRequest('http://localhost/api/capture-order', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

describe('POST /api/capture-order (Integration)', () => {
  const originalFetch = global.fetch

  afterEach(async () => {
    await supabaseTest.from('orders').delete().eq('paypal_order_id', TEST_ORDER_ID)
    vi.restoreAllMocks()
  })

  it('يحدّث حالة الطلب فعلياً بقاعدة البيانات الحقيقية عند نجاح الدفع', async () => {
    await supabaseTest.from('orders').insert({
      email: 'integration-test@test.com',
      user_id: 'test_user_integration',
      paypal_order_id: TEST_ORDER_ID,
      status: 'pending',
    })

    vi.spyOn(global, 'fetch').mockImplementation(async (url, options) => {
      const urlString = url.toString()

      if (urlString.includes('paypal.com')) {
        if (urlString.includes('oauth2/token')) {
          return { json: async () => ({ access_token: 'fake_token' }) } as any
        }
        if (urlString.includes('/capture')) {
          return { json: async () => ({ status: 'COMPLETED' }) } as any
        }
      }

      return originalFetch(url, options)
    })

    const res = await POST(makeRequest({ orderId: TEST_ORDER_ID }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)

    const { data: order } = await supabaseTest
      .from('orders')
      .select('status')
      .eq('paypal_order_id', TEST_ORDER_ID)
      .single()

    expect(order?.status).toBe('completed')
  })
})