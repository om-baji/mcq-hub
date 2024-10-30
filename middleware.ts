import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const url = request.nextUrl;

  if (
    token &&
    ["/", "/sign-in", "/sign-up", "/verify"].includes(url.pathname)
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    !token &&
    url.pathname.startsWith("/home") &&
    url.pathname !== "/sign-in"
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/verify/:path*",
    "/home/:path*",
    "/main",
  ],
};
