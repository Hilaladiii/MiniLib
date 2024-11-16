"use client";

import Image from "next/image";
import RowSkeleton from "./RowSkeleton";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { dateConverter } from "@/utils/date-converter";
import { returnBookService } from "@/services/borrow";

export default function TableCatalogUser({ data }: { data: ICatalog[] }) {
  const { toast } = useToast();

  const handleReturnBook = async (id: string) => {
    const res = await returnBookService(id);
    if (res.statusCode == 200) {
      toast({
        title: "Success",
        description: res.message,
      });
    } else {
      toast({
        title: "Failed",
        description: res.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>borrow date</TableHead>
            <TableHead>due date</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="flex justify-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length < 0
            ? Array.from({ length: 5 }).map((_, i) => <RowSkeleton index={i} />)
            : data.map((catalog, i) => (
                <TableRow key={i}>
                  <TableCell className="w-52">
                    <Image
                      src={catalog.book.cover_image}
                      alt={catalog.book.title}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{catalog.book.title}</TableCell>
                  <TableCell>{dateConverter(catalog.borrow_date)}</TableCell>
                  <TableCell>{dateConverter(catalog.due_date)}</TableCell>
                  <TableCell>{catalog.status.toLowerCase()}</TableCell>
                  <TableCell
                    className="flex justify-end gap-2"
                    onClick={() => handleReturnBook(catalog.id)}
                  >
                    <Button className="text-xs">return</Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
