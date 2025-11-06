"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosThumbsUp } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

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

interface BooksSliderCardProps {
  books: allBooksType[];
  filter?: "READ" | "READING" | "PLAN_TO_READ" | "ALL" | string;
  navPrefix: string;
}

export default function BookSliderCard({
  books,
  filter = "ALL",
  navPrefix,
}: BooksSliderCardProps) {
  const normalizedFilter = filter.toLowerCase();
  const nextElClass = `swiper-button-next-${navPrefix}`;
  const prevElClass = `swiper-button-prev-${navPrefix}`;

  const filteredBooks = books.filter((book) => {
    if (normalizedFilter === "all") return true;
    if (normalizedFilter === "read") return book.status === "READ";
    if (normalizedFilter === "plan_to_read")
      return book.status === "PLAN_TO_READ";
    if (book.genres && book.genres.length > 0) {
      return book.genres.some(
        (genre) => genre.toLowerCase() === normalizedFilter
      );
    }

    return false;
  });

  if (filteredBooks.length === 0) {
    const message =
      navPrefix === "read"
        ? "There is no book you haven't read yet.."
        : "There are no book in your readlist.";
    return (
      <div className="text-gray-400 text-lg p-8 text-center bg-gray-900 rounded-lg">
        {message}
      </div>
    );
  }

  return (
    <div className="relative p-4">
      {/* custom navigation menu for pc */}
      {/* for left arrow */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10">
        <button
          className={`${prevElClass} bg-orange-500 hover:bg-white p-2 rounded-full shadow-md transition cursor-pointer`}
        >
          <IoIosArrowBack className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      {/* for right arrow */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-10">
        <button
          className={`${nextElClass} bg-orange-500  hover:bg-white p-2 rounded-full shadow-md transition cursor-pointer`}
        >
          <IoIosArrowForward className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          //   nextEl: ".swiper-button-next", //to go forwad
          //   prevEl: ".swiper-button-prev", //to come back
          nextEl: `.${nextElClass}`,
          prevEl: `.${prevElClass}`,
        }}
        spaceBetween={16} //for card spacing
        slidesPerView={"auto"} //It allows multiple cards to be visible at the same time.
        grabCursor={true} //for mouse effect
        className="overflow-hidden"
      >
        {filteredBooks?.map((book) => (
          <SwiperSlide
            key={book.id}
            className="!w-[240px] sm:!w-[280px] md:!w-[320px]" //I have to set the width; unless I set the width, you can’t see the other posts.
          >
            <Link
              href={`/books/${
                book.genres.length > 0
                  ? book.genres[0].toLowerCase()
                  : "uncategorized"
              }/${book.slug}`}
            >
              <div className="flex flex-col gap-2 items-center  py-4">
                <div className=" relative  h-30 w-full rounded-xl overflow-hidden group cursor-pointer ">
                  <Image
                    src={book.coverImageUrl || "/personal-blog-hero.jpg"}
                    alt={book.title || "post image"}
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-600"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center justify-between">
                    <h3 className="font-bold ">
                      {book.title && book.title.length > 20
                        ? book.title.slice(0, 20)
                        : book.title}
                    </h3>
                  </div>
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
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
