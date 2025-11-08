import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosThumbsUp } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

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

interface BooksByCategoryProps {
  books: allBooksType[];
}
export default function BookCard({ books }: BooksByCategoryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:px-6 ">
      {books ? (
        books.map((book) => (
          <Link
            key={book.id}
            href={`/books/${
              book.genres.length > 0
                ? book.genres[0].toLowerCase()
                : "uncategorized"
            }/${book.slug}`}
            className="border-l  border-slate-800 md:p-4"
          >
            <div className="relative h-56 flex flex-col justify-end   bg-transparent text-white">
              <Image
                src={book.coverImageUrl || "/personal-blog-hero.webp"}
                alt={book.title || "post image"}
                fill
                className="object-cover object-top p-4 "
              />
              <div className="absolute top-2 right-4 bg-orange-500 text-white rounded-2xl text-sm px-2 flex items-center gap-2">
                <span>{book.myRating}</span>{" "}
                <span>
                  <FaStar />
                </span>
              </div>
            </div>
            <div className="  text-white rounded-md z-20 p-4 flex flex-col items-center gap-2">
              <h3 className="font-bold  text-sm text-slate-800">
                {book.title && book.title.length > 15
                  ? book.title.slice(0, 15) + "..."
                  : book.title}
              </h3>
              <div className="flex items-center gap-4 text-slate-800 text-sm">
                <span className="flex items-center gap-1">
                  <IoIosThumbsUp className="text-orange-400" />
                  {book._count?.likes || 0}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegComment className="text-orange-400" />
                  {book._count?.comments || 0}
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>There is no book</p>
      )}
    </div>
  );
}
