import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { head } from "@vercel/blob";

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

async function generateTempDownloadUrl(): Promise<string> {
  const blobUrl = process.env.BOOK_BLOB_URL!;
  
  const { downloadUrl } = await head(blobUrl, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  
  return downloadUrl;
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

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
const downloadUrl = await generateTempDownloadUrl();
console.log("Generated downloadUrl:", downloadUrl);

    await supabase
      .from("orders")
      .update({
        status: "completed",
        download_url: downloadUrl,
        download_expires_at: expiresAt.toISOString(),
      })
      .eq("paypal_order_id", orderId);

    return NextResponse.json({
      success: true,
      downloadUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to capture order",
      },
      {
        status: 500,
      }
    );
  }
}