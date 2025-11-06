import { getCommentByBookIdAction } from "@/actions/comments";
import { auth } from "@/auth";
import { prisma } from "@lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import BookCommentForm from "../components/BookCommentForm";
import BookComments from "../components/BookComments";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import LikeButton from "@/app/components/LikeButton";

interface BookDetailProps {
  params: {
    slug: string[];
  };
}

export default async function BookDetailPage({ params }: BookDetailProps) {
  const awatiedParams = await params;
  const slugArray = awatiedParams.slug;

  if (!slugArray || slugArray.length < 2) {
    notFound();
  }

  const categorySlug = slugArray[0];
  const bookSlug = slugArray[1];

  const book = await prisma.book.findUnique({
    where: { slug: bookSlug },
    include: {
      _count: {
        select: { comments: true, likes: true },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!book) {
    notFound();
  }

  const session = await auth();
  const comments = await getCommentByBookIdAction(book.id);
  const userId = session?.user?.id;
  const isLiked = book.likes.some((like) => like.userId === userId);

  return (
    <div className="bg-[url('/blog_bg.jpg')] min-h-screen">
      <div className="pt-16">
        <div className="p-8 text-white z-10 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative h-96 w-full md:h-96 md:w-[2300px] rounded-md">
              <Image
                src={book.coverImageUrl || "/personal-blog-hero.jpg"}
                alt={book.title}
                fill
                className="object-contain object-center rounded-md"
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl  font-bold text-orange-500 mb-8 text-center md:text-start">
                  {book.title}
                </h1>
                <p className="text-slate-300 text-sm flex flex-col md:flex-row items-start md:items-center gap-2">
                  <span className="text-orange-500 font-bold">category: </span>{" "}
                  {book.genres.join(", ")}
                </p>
              </div>
              <div className="space-y-4 text-slate-300">
                <div className="text-sm flex items-center gap-2">
                  <span className="text-orange-500 font-bold">My Raiting:</span>
                  <div className="flex items-center gap-2">
                    <p>{book.myRating}</p>
                    <span className="text-yellow-400">
                      <FaStar />
                    </span>
                  </div>
                </div>
                <p className="text-sm flex items-center gap-2">
                  <span className="text-orange-500 font-bold">
                    Publish Year:{" "}
                  </span>
                  {book.publishYear}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="text-orange-500 font-bold">
                    Page Count:{" "}
                  </span>
                  {book.pageCount}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="text-orange-500 font-bold">Status:</span>
                  {book.status}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="text-orange-500 font-bold">Author:</span>
                  {book.authorName}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="text-orange-500 font-bold">Publisher:</span>
                  {book.publisher}
                </p>

                <p className="text-sm flex flex-col md:flex-row items-start gap-2">
                  <span className="text-orange-500 font-bold">
                    Description:{" "}
                  </span>
                  {book.description}
                </p>
                <div>
                  <LikeButton
                    type="book"
                    id={book.id}
                    path={`/blogs/${categorySlug}/${book.slug}`}
                    initialLiked={isLiked}
                    initialLikeCount={book._count.likes}
                    isAuthenticated={!!session?.user}
                  />
                </div>

                <section className="mt-12">
                  <BookCommentForm
                    bookId={book.id}
                    isAuthenticated={!!session?.user}
                  />
                </section>
                <section>
                  <BookComments comments={comments} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
