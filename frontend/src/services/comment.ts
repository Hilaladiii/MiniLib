"use server";

import { FetchApp } from "@/utils/fetch";
import { cookies } from "next/headers";

export async function createCommentService(data: {
  book_id: string;
  borrowing_id: string;
  content: string;
}) {
  const cookie = await cookies();
  const res = await FetchApp({
    path: "comment",
    option: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${cookie.get("token")?.value}`,
        "Content-Type": "application/json",
      },
    },
  });

  return res;
}

export async function getCommentByBookId(id: string) {
  const res = await FetchApp({
    path: `comment/${id}`,
    option: {
      method: "GET",
    },
  });

  return res;
}
