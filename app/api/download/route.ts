import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

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
    return NextResponse.json({ error: "No purchase found" }, { status: 403 });
  }

  const { data, error: storageError } = await supabaseAdmin.storage
    .from("books")
    .createSignedUrl("because-i-loved.pdf", 60);

  if (storageError || !data?.signedUrl) {
    console.error("Storage error:", storageError);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl);
}