import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabaseServer";

type Payload = {
  fullName?: string;
  title?: string;
  email?: string;
  church?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Payload;
  const { fullName, title, email, church } = body;

  if (!fullName || !title || !email || !church) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const supabase = await getServerSupabase();
  const { error } = await supabase.from("early_access_signups").insert({
    full_name: fullName,
    title,
    email,
    church,
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to save your request right now. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
