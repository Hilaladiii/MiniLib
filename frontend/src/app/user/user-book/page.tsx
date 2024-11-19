import CardCatalog from "@/components/fragments/CardCatalog";
import { getBorrowUserService } from "@/services/borrow";
import { ICatalogUser } from "@/types/book.type";

export default async function UserBorrowPage() {
  const books = await getBorrowUserService();
  return (
    <div className="grid grid-cols-3 gap-5">
      {books.data.map((book: ICatalogUser, i: number) => (
        <CardCatalog
          key={i}
          id={book.id}
          book_id={book.book.id}
          title={book.book.title}
          cover_image={book.book.cover_image}
          borrow_date={book.borrow_date}
          due_date={book.due_date}
          status={book.status}
        />
      ))}
    </div>
  );
}
