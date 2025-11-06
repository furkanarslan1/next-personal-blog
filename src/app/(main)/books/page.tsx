import ReadingStats from "@/app/components/ReadingStats";
import { bookCategories } from "@lib/constants/bookCategories";
import { prisma } from "@lib/prisma";
import React from "react";
import BooksByCategories from "./components/BooksByCategories";
import BookSliderCard from "./components/BookSliderCard";

interface allBooksType {
  id: string;
  title: string;
  coverImageUrl: string | null;
  myRating: number | null;
  status: "READ" | "READING" | "PLAN_TO_READ";
  genres: string[];
  slug: string;
  _count?: {
    likes: number;
    comments: number;
  };
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
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
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
    <div className="pb-8 ">
      <div className="bg-slate-800 h-16 "></div>
      <div className="max-w-7xl mx-auto">
        <ReadingStats />
        <div className="py-4">
          <h3 className="text-3xl px-4  font-bold text-slate-800 ">
            I READ BOOK
          </h3>
          <BookSliderCard books={books} filter="READ" navPrefix="plan_read" />
        </div>
        <BooksByCategories books={books} uniqueGenres={uniqueGenres} />
      </div>
    </div>
  );
}
