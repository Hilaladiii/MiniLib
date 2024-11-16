import TableCatalogUser from "@/components/fragments/TableCatalogUser";
import { getBorrowUserService } from "@/services/borrow";

export default async function CatalogPage() {
  const catalog = await getBorrowUserService();

  return (
    <div>
      <TableCatalogUser data={catalog.data} />
    </div>
  );
}
