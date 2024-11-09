import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./types/jwt.type";
import { isTokenExpired } from "./utils/token";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;
  if (!token) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }
  const decodedToken: JwtPayload = jwtDecode(token!.value);
  if (isTokenExpired(decodedToken.exp)) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }
  if (decodedToken.role != "ADMIN" && pathname.startsWith("/admin")) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
