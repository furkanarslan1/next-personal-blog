import { prisma } from "@lib/prisma";
import Image from "next/image";
import React from "react";
import DeleteBookButton from "./components/DeleteBookButton";

interface BooksType {
  id: string;
  title: string;
  coverImageUrl: string | null;
}

async function getBooks(): Promise<BooksType[]> {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      coverImageUrl: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return books;
}

export default async function DeleteBookPage() {
  const allBooks = await getBooks();

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h2 className="text-xl font-bold mb-2">All Books</h2>
      <ul className="grid grid-cols-1 md:grid-cols-4  gap-4">
        {allBooks.map((book) => (
          <li
            key={book.id}
            className="flex flex-col items-center gap-2 border-2 border-orange-500 rounded-md py-4 "
          >
            <h2 className="font-bold">{book.title}</h2>
            <div className="relative h-56 w-56">
              <Image
                src={book.coverImageUrl || "/personal-blog-hero.jpg"}
                alt={book.title}
                fill
              />
            </div>
            <DeleteBookButton id={book.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
