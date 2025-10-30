import ReadingStats from "@/app/components/ReadingStats";
import { bookCategories } from "@lib/constants/bookCategories";
import { prisma } from "@lib/prisma";
import React from "react";
import BooksByCategories from "./components/BooksByCategories";

interface allBooksType {
  id: string;
  title: string;
  coverImageUrl: string | null;
  myRating: number | null;
  status: "READ" | "READING" | "PLAN_TO_READ";
  genres: string[];
  slug: string;
}

async function getBooks(): Promise<allBooksType[]> {
  try {
    const allBooks = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        slug: true,
        status: true,
        genres: true,
        myRating: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return allBooks;
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks();
  const uniqueGenres = bookCategories;
  return (
    <div>
      <div className="bg-slate-800 h-16 "></div>
      <div className="">
        <ReadingStats />
        <BooksByCategories books={books} uniqueGenres={uniqueGenres} />
      </div>
    </div>
  );
}
