"use server";

import { IResponseError, IResponseSuccess } from "@/types/response.type";
import { FetchApp } from "@/utils/fetch";

export async function getUsersService() {
  const res = await FetchApp({
    path: "user",
    option: {
      method: "GET",
    },
  });

  const response: IResponseSuccess & IResponseError = res;
  return response;
}

export async function blockUserService(id: string) {
  const res = await FetchApp({
    path: `user/block/${id}`,
    option: {
      method: "PUT",
    },
  });
  return res;
}

export async function unBlockUserService(id: string) {
  const res = await FetchApp({
    path: `user/unblock/${id}`,
    option: {
      method: "PUT",
    },
  });
  return res;
}
