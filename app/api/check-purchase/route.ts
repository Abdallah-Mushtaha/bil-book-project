import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ purchased: false });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "completed")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ purchased: false });
  }

  return NextResponse.json({ purchased: !!data });
}