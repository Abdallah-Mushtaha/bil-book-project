import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");
  const fallbackUrl = process.env.FALLBACK_URL!;

  if (!orderId) {
    return NextResponse.redirect(fallbackUrl);
  }

  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("status")
      .eq("paypal_order_id", orderId)
      .eq("status", "completed")
      .single();

    if (error || !order) {
      return NextResponse.redirect(fallbackUrl);
    }

    const { data, error: storageError } = await supabaseAdmin.storage
      .from("books")
      .createSignedUrl("because-i-loved.pdf", 60);

    if (storageError || !data?.signedUrl) {
      return NextResponse.redirect(fallbackUrl);
    }

    return NextResponse.redirect(data.signedUrl);
  } catch {
    return NextResponse.redirect(fallbackUrl);
  }
}