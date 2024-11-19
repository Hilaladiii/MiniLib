"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllBorrowUserService } from "@/services/borrow";
import { ICatalogAdmin } from "@/types/book.type";
import { cn } from "@/utils/cn";
import { dateTimeConverter } from "@/utils/date-converter";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CatalogAdminPage() {
  const [catalogs, setCatalogs] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const type = searchParams.get("type") || "RETURNED";
  const setParamsType = (type: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBorrowUserService(type);
      setCatalogs(res.data);
    };
    fetchData();
  }, [type]);
  return (
    <div>
      <div className="space-x-4 mb-5">
        <Link
          href={setParamsType("RETURNED")}
          className={cn(
            "text-black bg-white p-2 rounded-md",
            type == "RETURNED" && "bg-black text-white"
          )}
        >
          Returned
        </Link>
        <Link
          href={setParamsType("BORROWED")}
          className={cn(
            "text-black bg-white p-2 rounded-md",
            type == "BORROWED" && "bg-black text-white"
          )}
        >
          Borrowed
        </Link>
        <Link
          href={setParamsType("OVERDUE")}
          className={cn(
            "text-black bg-white p-2 rounded-md",
            type == "OVERDUE" && "bg-black text-white"
          )}
        >
          Overdue
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Due Date</TableHead>
            {type == "RETURNED" && <TableHead>Return Date</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {catalogs.map((catalog: ICatalogAdmin, i: number) => (
            <TableRow key={i}>
              <TableCell className="w-52">{catalog.user.username}</TableCell>
              <TableCell>{catalog.book.title}</TableCell>
              <TableCell>{dateTimeConverter(catalog.borrow_date)}</TableCell>
              <TableCell>{dateTimeConverter(catalog.due_date)}</TableCell>
              {type == "RETURNED" && (
                <TableCell>{dateTimeConverter(catalog.return_date)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
