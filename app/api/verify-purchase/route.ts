import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ hasPurchased: false });
  }

  const { data: order } = await supabase
    .from("orders")
    .select("status")
    .eq("user_id", userId)
    .eq("status", "completed")
    .single();

  return NextResponse.json({ hasPurchased: !!order });
}
