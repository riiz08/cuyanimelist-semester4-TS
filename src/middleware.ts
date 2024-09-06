import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session =
    process.env.NODE_ENV === "production"
      ? req.cookies.get("__Secure-next-auth.session-token")
      : req.cookies.get("next-auth.session-token");
  if (!session && req.nextUrl.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  return NextResponse.next();
}
