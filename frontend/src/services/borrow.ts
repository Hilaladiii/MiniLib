"use server";

import { IResponseError, IResponseSuccess } from "@/types/response.type";
import { FetchApp } from "@/utils/fetch";

export async function borrowBook(id: string) {
  const res = await FetchApp({
    path: `borrow/${id}`,
    option: {
      method: "POST",
    },
  });
  const response: IResponseError & IResponseSuccess = res;
  return response;
}

export async function returnBookService(id: string) {
  const res = await FetchApp({
    path: `borrow/return/${id}`,
    option: {
      method: "PUT",
    },
  });

  return res;
}

export async function getBorrowUserService() {
  const res = await FetchApp({
    path: "borrow/user",
    option: {
      method: "GET",
    },
  });

  const response: IResponseError & IResponseSuccess = res;
  return response;
}

export async function getAllBorrowUserService(query?: string) {
  const res = await FetchApp({
    path: `borrow?type=${query || "RETURNED"}`,
    option: {
      method: "GET",
    },
  });

  return res;
}
