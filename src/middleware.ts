// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // This reads the browser session and sets/refreshes the SB cookies
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getUser(); // touch auth to ensure cookies are written

  return res;
}

// run on everything except Next’s static assets (tweak as you like)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
