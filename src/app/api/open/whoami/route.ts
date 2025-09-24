import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user }, error } = await supabase.auth.getUser();

  const jar = await cookies(); // <-- await, then read names safely
  return NextResponse.json({
    ok: !!user,
    userId: user?.id ?? null,
    error: error?.message ?? null,
    cookieNames: jar.getAll().map(c => c.name),
  });
}
