import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
interface allBooksType {
  id: string;
  title: string;
  coverImageUrl: string | null;
  myRating: number | null;
  status: "READ" | "READING" | "PLAN_TO_READ";
  genres: string[];
  slug: string;
}

interface BooksByCategoryProps {
  books: allBooksType[];
}
export default function BookCard({ books }: BooksByCategoryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6  px-6">
      {books ? (
        books.map((book) => (
          <Link
            key={book.id}
            href={`/books/${
              book.genres.length > 0
                ? book.genres[0].toLowerCase()
                : "uncategorized"
            }/${book.slug}`}
          >
            {/* <div className=" relative  h-80 w-full rounded-xl overflow-hidden group cursor-pointer ">
              <Image
                src={book.coverImageUrl || "/personal-blog-hero.jpg"}
                alt={book.title || "post image"}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-600"
              />
              <span className=" group-hover:absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/60 to-transparent"></span>

              <div className="group-hover:absolute bottom-0 p-4 text-orange-500 w-full transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold ">
                    {book.title && book.title.length > 20
                      ? book.title.slice(0, 20)
                      : book.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-300">
                    <p>{book.myRating}</p>
                    <FaStar />
                  </div>
                </div>
              </div>
            </div> */}

            <div className="relative h-56 flex flex-col justify-end gap-2 border-4 border-orange-500 rounded-md bg-slate-800 text-white">
              <Image
                src={book.coverImageUrl || "/personal-blog-hero.jpg"}
                alt={book.title || "post image"}
                fill
                className="object-cover object-top "
              />
              <div className="absolute top-2 right-4 bg-orange-500 text-white rounded-2xl text-sm px-2 flex items-center gap-2">
                <span>{book.myRating}</span>{" "}
                <span>
                  <FaStar />
                </span>
              </div>

              <div className=" bg-black/60 text-white z-20 p-4">
                <h3 className="font-bold ">
                  {book.title && book.title.length > 20
                    ? book.title.slice(0, 20)
                    : book.title}
                </h3>
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
