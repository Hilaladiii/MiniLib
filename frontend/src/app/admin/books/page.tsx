"use client";

import Image from "next/image";
import { getBooksService, deleteBookService } from "@/services/book";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";
import ModalAddBook from "./_components/ModalAddBook";
import AddIcon from "@/assets/add-icon.svg";
import EditIcon from "@/assets/edit-icon.svg";
import DeleteIcon from "@/assets/delete-icon.svg";
import ModalEditBook from "./_components/ModalEditBook";

export default function AdminBookPage() {
  const [modal, setModal] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const [books, setBooks] = useState<IBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<IBook>();

  const fetchData = async () => {
    const res = await getBooksService();
    setBooks(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBook = (id: string) => {
    const res = deleteBookService(id);
    toast.promise(res, {
      success: (res) => {
        fetchData();
        return res.message;
      },
      error: "Failed to delete book",
      loading: "Loading",
    });
  };

  const handleEditBook = (id: string) => {
    setSelectedBook(books.find((book) => book.id == id));
    setModal((prev) => ({ ...prev, edit: true }));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">Book Management</h1>
          <Button
            variant="black"
            className="w-fit inline-flex gap-2 items-center px-3 py-2"
            onClick={() => setModal((prev) => ({ ...prev, add: true }))}
          >
            <AddIcon /> add book
          </Button>
        </div>

        <div className="mt-8">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-base border-b">
                <th className="font-medium">Cover</th>
                <th className="font-medium">Title</th>
                <th className="font-medium">Author</th>
                <th className="font-medium">Publisher</th>
                <th className="font-medium">Year</th>
                <th className="font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.length >= 0 ? (
                books.map((book, i) => (
                  <tr className="text-xs text-center border-b" key={i}>
                    <td>
                      <div className="flex item-center justify-center">
                        <Image
                          src={book.cover_image}
                          alt={book.title}
                          width={60}
                          height={60}
                        />
                      </div>
                    </td>
                    <td> {book.title}</td>
                    <td> {book.author_name}</td>
                    <td>{book.publisher_name}</td>
                    <td>{book.year_published}</td>
                    <td className="w-20 p-7">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleEditBook(book.id)}>
                          <EditIcon />
                        </button>
                        <button onClick={() => handleDeleteBook(book.id)}>
                          <DeleteIcon className="text-red-500 " />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <>loading</>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddBook
        isOpen={modal.add}
        fetchReload={fetchData}
        onClose={() => setModal((prev) => ({ ...prev, add: false }))}
      />
      <ModalEditBook
        isOpen={modal.edit}
        fetchReload={fetchData}
        onClose={() => setModal((prev) => ({ ...prev, edit: false }))}
        initialData={selectedBook}
      />
    </>
  );
}
