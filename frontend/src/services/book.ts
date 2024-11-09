"use server";

import { TBook, TUpdateBook } from "@/app/admin/books/validation";
import { IResponseError, IResponseSuccess } from "@/types/response.type";
import { cookies } from "next/headers";

export async function addBookService(data: TBook) {
  const cookie = await cookies();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("file", data.file);
  formData.append("author_name", data.author_name);
  formData.append("publisher_name", data.publisher_name);
  formData.append("year_published", data.year_published.toString());

  const res = await fetch(`${process.env.BASE_API_URL}/book/create`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${cookie.get("token")?.value}`,
    },
  });

  const response = await res.json();
  return response;
}

export async function getBooksService() {
  const cookie = await cookies();
  const res = await fetch(`${process.env.BASE_API_URL}/book`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie.get("token")?.value}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const response: IResponseSuccess & IResponseError = await res.json();
  return response;
}

export async function updateBookService(id: string, data: TUpdateBook) {
  const cookie = await cookies();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("file", data!.file as File);
  formData.append("author_name", data.author_name);
  formData.append("publisher_name", data.publisher_name);
  formData.append("year_published", data.year_published.toString());

  const res = await fetch(`${process.env.BASE_API_URL}/book/update/${id}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${cookie.get("token")?.value}`,
    },
  });

  const response = await res.json();
  return response;
}

export async function deleteBookService(id: string) {
  const cookie = await cookies();
  const res = await fetch(`${process.env.BASE_API_URL}/book/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookie.get("token")?.value}`,
    },
  });
  if (!res.ok) {
    throw new Error();
  }
  const response: Promise<IResponseSuccess & IResponseError> = res.json();
  return response;
}
