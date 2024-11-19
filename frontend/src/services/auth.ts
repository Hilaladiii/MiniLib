"use server";

import { TLogin } from "@/app/(auth)/login/validation";
import { TRegister } from "@/app/(auth)/register/validation";
import { IResponseError, IResponseSuccess } from "@/types/response.type";
import { cookies } from "next/headers";
import { FetchApp } from "@/utils/fetch";

export async function login(data: TLogin) {
  const cookie = await cookies();
  const res = await FetchApp({
    path: "auth/login",
    option: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  const response: IResponseSuccess & IResponseError = res;
  if (response.statusCode == 200)
    cookie.set("token", response.data.token, { httpOnly: true, secure: true });
  return response;
}

export async function registerService(data: TRegister) {
  const res = await FetchApp({
    path: "user/register",
    option: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  const response: IResponseSuccess & IResponseError = res;
  return response;
}

export async function logout() {
  const cookie = await cookies();
  const res = await FetchApp({
    path: "auth/logout",
    option: {
      method: "POST",
    },
  });

  const response: IResponseSuccess & IResponseError = res;
  if (response.statusCode == 200) cookie.delete("token");
  return response;
}
