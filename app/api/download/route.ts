import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  // تحقق إن الـ order completed
  const { data: order, error } = await supabase
    .from("orders")
    .select("status")
    .eq("paypal_order_id", orderId)
    .eq("status", "completed")
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "No purchase found" }, { status: 403 });
  }

  // ولّد signed URL مؤقتة من Supabase Storage — 60 ثانية بس
  const { data, error: storageError } = await supabase.storage
    .from("books")
    .createSignedUrl("because-i-loved.pdf", 60);

  if (storageError || !data?.signedUrl) {
    console.error("Storage error:", storageError);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // redirect لـ signed URL — المتصفح بيحمل الملف مباشرة
  return NextResponse.redirect(data.signedUrl);
}