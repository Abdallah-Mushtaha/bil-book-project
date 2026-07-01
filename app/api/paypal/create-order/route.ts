import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function getPayPalAccessToken() {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
  ).toString("base64");

  const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();

    // 1. فحص هل المستخدم اشترى الكتاب مسبقاً (status: completed)
    const { data: existingOrder, error: checkError } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "completed")
      .maybeSingle();

    if (checkError) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (existingOrder) {
      return NextResponse.json({ error: "You already own this book" }, { status: 400 });
    }

    // 2. إذا لم يكن موجوداً، أكمل عملية إنشاء الطلب
    const accessToken = await getPayPalAccessToken();

    const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "USD", value: "9.99" },
            description: "Because I Loved - Digital Edition",
          },
        ],
      }),
    });

    const order = await res.json();

    if (!order.id) {
      return NextResponse.json({ error: "PayPal order creation failed" }, { status: 500 });
    }

    // 3. تخزين الطلب في قاعدة البيانات كـ pending
    const { error: insertError } = await supabase.from("orders").insert({
      email,
      user_id: userId,
      paypal_order_id: order.id,
      status: "pending",
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("create-order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}