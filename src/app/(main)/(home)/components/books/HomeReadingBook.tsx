import { prisma } from "@lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function HomeReadingBook() {
  const readingBook = await prisma.book.findFirst({
    where: { status: "READING" },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
    select: {
      title: true,
      authorName: true,
      coverImageUrl: true,
      slug: true,
      genres: true,
      description: true,
    },
  });

  const primaryGenreSlug = readingBook?.genres[0]
    ? readingBook.genres[0].replace(/\s/g, "-")
    : "general";

  if (!readingBook) {
    return (
      <div className="bg-[url('/blog_bg.jpg')] bg-contain bg-center p-6 text-center text-white/80 h-64 flex flex-col justify-center items-start rounded-lg shadow-lg max-w-7xl mx-auto">
        <p className="text-xl text-white font-semibold mb-2">
          Currently Reading
        </p>
        <p>You are not currently reading a book. Start a new adventure!</p>
      </div>
    );
  }
  return (
    <div className=" p-4 max-w-7xl mx-auto  md:rounded-md">
      <h3 className="text-xl font-extrabold text-slate-800 mb-4 text-center md:text-start">
        My Current Read
      </h3>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 ">
        <Link
          href={`/books/${primaryGenreSlug}/${readingBook.slug}`}
          className="flex flex-col items-center hover:scale-105 transition-all duration-500"
        >
          <div className="relative h-52 md:h-72 w-54">
            <Image
              src={readingBook.coverImageUrl || "/personal-hero-blog.jpg"}
              alt={readingBook.title}
              className="object-contain object-center"
              fill
            />
          </div>
          <div className="text-slate-800 space-y-2 mt-1 flex flex-col items-center">
            <h1 className="font-bold">{readingBook.title}</h1>
            <div>
              <p className="text-sm">
                <span className="text-orange-600 font-bold">Author: </span>
                {readingBook.authorName}
              </p>
              <p className="text-sm">
                <span className="text-orange-600 font-bold">Genre: </span>
                {primaryGenreSlug}
              </p>
            </div>
          </div>
        </Link>
        <div className="hidden md:block">
          <p className="text-slate-800 font-bold">Description:</p>
          <p className="text-sm md:text-lg">
            {readingBook.description
              ? readingBook.description.length > 1200
                ? readingBook.description.slice(0, 1200) + "..."
                : readingBook.description
              : "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
}
