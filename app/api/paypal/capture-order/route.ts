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
    const { orderId } = await req.json();

    const accessToken = await getPayPalAccessToken();

    const res = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = await res.json();

    if (captureData.status !== "COMPLETED") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // تحديث قاعدة البيانات عند نجاح العملية
    // يتم التحديث ليصبح status = completed
    // بما أنك تستخدم createSignedUrl في ملف الـ download، 
    // لا نحتاج لتخزين رابط ثابت هنا، يكفي تغيير الحالة.
    const { error } = await supabase
      .from("orders")
      .update({ 
        status: "completed" 
      })
      .eq("paypal_order_id", orderId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("capture-order error:", error);
    return NextResponse.json({ error: "Failed to capture order" }, { status: 500 });
  }
}