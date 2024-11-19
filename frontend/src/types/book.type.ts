export interface IBook {
  id: string;
  title: string;
  cover_image: string;
  author_name: string;
  publisher_name: string;
  year_published: number;
  quantity: number;
}

export interface ICatalogUser {
  id: string;
  borrow_date: string;
  due_date: string;
  status: string;
  book: Pick<IBook, "title" | "cover_image" | "id">;
}

export interface ICatalogAdmin {
  id: string;
  borrow_date: string;
  due_date: string;
  return_date: string;
  status: string;
  book: Pick<IBook, "title">;
  user: {
    username: string;
  };
}
