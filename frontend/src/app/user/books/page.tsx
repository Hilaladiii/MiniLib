import TableBookUser from "@/components/fragments/TableBookUser";
import { getBooksService } from "@/services/book";

export default async function BookPage() {
  const books = await getBooksService();
  return (
    <div>
      <h1 className="font-semibold text-2xl">Books</h1>
      <TableBookUser data={books.data} />
    </div>
  );
}
