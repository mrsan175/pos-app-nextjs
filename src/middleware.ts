import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const cookie = (await cookies()).get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log(payload);
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
