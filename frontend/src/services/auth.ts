"use server";

import { TLogin } from "@/app/(auth)/login/validation";
import { TRegister } from "@/app/(auth)/register/validation";
import { IResponseError, IResponseSuccess } from "@/types/response.type";
import { cookies } from "next/headers";

export async function login(data: TLogin) {
  const cookie = await cookies();
  const res = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response: IResponseSuccess & IResponseError = await res.json();
  if (response.statusCode == 200)
    cookie.set("token", response.data.token, { httpOnly: true, secure: true });
  return response;
}

export async function registerService(data: TRegister) {
  const res = await fetch(`${process.env.BASE_API_URL}/user/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response: IResponseSuccess & IResponseError = await res.json();
  return response;
}

export async function logout() {
  const cookie = await cookies();
  const res = await fetch(`${process.env.BASE_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie.get("token")?.value}`,
    },
  });

  const response: IResponseSuccess & IResponseError = await res.json();
  if (response.statusCode == 200) cookie.delete("token");
  return response;
}
