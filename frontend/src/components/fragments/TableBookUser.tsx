"use client";

import Image from "next/image";
import RowSkeleton from "./RowSkeleton";
import { Button } from "../ui/button";
import { borrowBook } from "@/services/borrow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function TableBookUser({ data }: { data: IBook[] }) {
  const { toast } = useToast();
  const handleBorrowBook = async (id: string) => {
    const res = await borrowBook(id);
    if (res.statusCode == 201) {
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
            <TableHead>Author</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead className="flex justify-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length < 0
            ? Array.from({ length: 5 }).map((_, i) => <RowSkeleton index={i} />)
            : data.map((book, i) => (
                <TableRow key={i}>
                  <TableCell className="w-52">
                    <Image
                      src={book.cover_image}
                      alt={book.title}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author_name}</TableCell>
                  <TableCell>{book.publisher_name}</TableCell>
                  <TableCell>{book.year_published}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      className="text-xs"
                      onClick={() => handleBorrowBook(book.id)}
                    >
                      borrow
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
