import { JwtPayload } from "@/types/jwt.type";
import { jwtDecode } from "jwt-decode";
import { cookies, UnsafeUnwrappedCookies } from "next/headers";

export function getProfile() {
  const cookie = cookies() as unknown as UnsafeUnwrappedCookies;
  const token = cookie.get("token")?.value;
  const decodedToken: JwtPayload = jwtDecode(token!);
  return decodedToken.username;
}
