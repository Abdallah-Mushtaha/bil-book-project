import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ hasPurchased: false });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("status")
      .eq("user_id", userId)
      .eq("status", "completed")
      .single();

    console.log("order:", order);
    console.log("error:", error);

    return NextResponse.json({ hasPurchased: !!order });
  } catch (err) {
    console.error("verify-purchase error:", err);
    return NextResponse.json({ hasPurchased: false }, { status: 500 });
  }
}