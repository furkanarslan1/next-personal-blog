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
    },
  });

  const primaryGenreSlug = readingBook?.genres[0]
    ? readingBook.genres[0].replace(/\s/g, "-")
    : "general";

  if (!readingBook) {
    return (
      <div className="bg-[url('/blog_bg.jpg')] bg-contain bg-center p-6 text-center text-white/80 h-64 flex flex-col justify-center items-start rounded-lg shadow-lg">
        <p className="text-xl text-white font-semibold mb-2">
          Currently Reading
        </p>
        <p>You are not currently reading a book. Start a new adventure!</p>
      </div>
    );
  }
  return (
    <div className="bg-[url('/blog_bg.jpg')] bg-contain bg-center  p-4 ">
      <h3 className="text-xl font-bold text-white mb-4 ">My Current Read</h3>
      <div className="flex items-center justify-center">
        <Link
          href={`/books/${readingBook.genres}/${readingBook.slug}`}
          className=""
        >
          <div className="relative h-72 w-54">
            <Image
              src={readingBook.coverImageUrl || "/personal-hero-blog.jpg"}
              alt={readingBook.title}
              className="object-cover object-center"
              fill
            />
          </div>
          <div className="text-slate-300 space-y-2 mt-1">
            <h1 className="font-bold">{readingBook.title}</h1>
            <div>
              <p className="text-sm">
                <span className="text-orange-500 font-bold">Author: </span>
                {readingBook.authorName}
              </p>
              <p className="text-sm">
                <span className="text-orange-500 font-bold">Genre: </span>
                {primaryGenreSlug}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
