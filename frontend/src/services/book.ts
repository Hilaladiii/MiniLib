"use server";

import { TBook, TUpdateBook } from "@/app/admin/books/validation";
import { IResponseError, IResponseSuccess } from "@/types/response.type";
import { FetchApp } from "@/utils/fetch";

export async function addBookService(data: TBook) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("file", data.file);
  formData.append("author_name", data.author_name);
  formData.append("publisher_name", data.publisher_name);
  formData.append("year_published", data.year_published.toString());
  formData.append("quantity", data.quantity.toString());

  const res = await FetchApp({
    path: "book/create",
    option: {
      method: "POST",
      body: formData,
    },
  });
  const response: IResponseSuccess & IResponseError = res;
  return response;
}

export async function getBooksService() {
  const res = await FetchApp({
    path: "book",
    option: {
      method: "GET",
    },
  });
  const response: IResponseSuccess & IResponseError = res;
  return response;
}

export async function updateBookService(id: string, data: TUpdateBook) {
  const formData = new FormData();
  formData.append("title", data.title);
  if (data.file) {
    formData.append("file", data!.file as File);
  }
  formData.append("author_name", data.author_name);
  formData.append("publisher_name", data.publisher_name);
  formData.append("year_published", data.year_published.toString());
  formData.append("quantity", data.quantity.toString());

  const res = await FetchApp({
    path: `book/update/${id}`,
    option: {
      method: "PUT",
      body: formData,
    },
  });

  const response: IResponseSuccess & IResponseError = res;
  return response;
}

export async function getBookByIdService(id: string) {
  const res = await FetchApp({
    path: `book/${id}`,
    option: {
      method: "GET",
    },
  });
  const response: IResponseSuccess & IResponseError = res;
  return response;
}

export async function deleteBookService(id: string) {
  const res = await FetchApp({
    path: `book/delete/${id}`,
    option: {
      method: "DELETE",
    },
  });
  const response: IResponseSuccess & IResponseError = res;
  return response;
}
