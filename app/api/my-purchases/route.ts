import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ orders: [] });
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId) 
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const uniqueOrders = Array.from(new Map(orders.map(item => [item.paypal_order_id, item])).values());

  return NextResponse.json({ orders: uniqueOrders });
}