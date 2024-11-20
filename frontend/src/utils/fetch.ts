"use server";

import { cookies } from "next/headers";

interface IFetchApp {
  path: string;
  option?: RequestInit;
}

export async function FetchApp({ path, option }: IFetchApp) {
  const cookie = await cookies();
  console.log(process.env.BASE_API_URL_SECURE)
  const res = await fetch(`${process.env.BASE_API_URL_SECURE}/${path}`, {
    headers: {
      Authorization: `Bearer ${cookie.get("token")?.value}`,
    },
    ...option,
  });
  return await res.json();
}
