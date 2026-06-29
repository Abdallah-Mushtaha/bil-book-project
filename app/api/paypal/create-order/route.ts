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

    const { error } = await supabase.from("orders").insert({
      email,
      user_id: userId,
      paypal_order_id: order.id,
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
    }

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("create-order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}