"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { IoIosThumbsUp } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

interface MovieType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
  _count?: {
    likes: number;
    comments: number;
  };
}

interface MovieCardProps {
  movies: MovieType[];
  filter?: "WATCHED" | "PLAN_TO_WATCH" | "ALL" | string;
  navPrefix: string;
}

export default function MovieCard({
  movies,
  filter = "ALL",
  navPrefix,
}: MovieCardProps) {
  const normalizedFilter = filter.toLowerCase();
  const nextElClass = `swiper-button-next-${navPrefix}`;
  const prevElClass = `swiper-button-prev-${navPrefix}`;

  const filteredMovies = movies.filter((movie) => {
    if (normalizedFilter === "all") return true;
    if (normalizedFilter === "watched") return movie.status === "WATCHED";
    if (normalizedFilter === "plan_to_watch")
      return movie.status === "PLAN_TO_WATCH";
    if (movie.genres && movie.genres.length > 0) {
      return movie.genres.some(
        (genre) => genre.toLowerCase() === normalizedFilter
      );
    }

    return false;
  });

  if (filteredMovies.length === 0) {
    const message =
      navPrefix === "watched"
        ? "There is no movie you haven't watched yet.."
        : "There are no movies in your watchlist.";
    return (
      <div className="text-gray-400 text-lg p-8 text-center bg-gray-900 rounded-lg">
        {message}
      </div>
    );
  }
  return (
    <div className="relative">
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
        {filteredMovies?.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="!w-[240px] sm:!w-[280px] md:!w-[320px]" //I have to set the width; unless I set the width, you can’t see the other posts.
          >
            <Link
              href={`/movies/${
                movie.genres.length > 0
                  ? movie.genres[0].toLowerCase()
                  : "uncategorized"
              }/${movie.slug}`}
              className="flex flex-col items-center"
            >
              {/* <div className=" relative  h-80 w-full rounded-xl overflow-hidden group cursor-pointer "> */}
              {/* <div className=" relative  h-80 w-52 rounded-xl overflow-hidden group cursor-pointer ">
                <Image
                  src={movie.posterUrl || "/personal-blog-hero.webp"}
                  alt={movie.title || "post image"}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-600"
                />
                <span className=" group-hover:absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/60 to-transparent"></span>

                <div className="group-hover:absolute bottom-0 p-4 text-orange-500 w-full transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold ">
                      {movie.title && movie.title.length > 20
                        ? movie.title.slice(0, 20)
                        : movie.title}
                    </h3>

                    <div className="flex items-center gap-1 text-yellow-300">
                      <p>{movie.rating}</p>
                      <FaStar />
                    </div>
                  </div>
                  <div className="flex items-center  gap-4 text-slate-300 text-sm">
                    <span className="flex items-center gap-1">
                      <IoIosThumbsUp className="text-orange-400" />
                      {movie._count?.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegComment className="text-orange-400" />
                      {movie._count?.comments || 0}
                    </span>
                  </div>
                </div>
              </div> */}

              <div className=" relative  h-72 w-42 md:w-52  rounded-xl overflow-hidden group cursor-pointer ">
                <Image
                  src={movie.posterUrl || "/personal-blog-hero.webp"}
                  alt={movie.title || "post image"}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-600"
                />
                <span className=" group-hover:absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/60 to-transparent"></span>
                <div className="absolute right-5 bottom-3">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <p>{movie.rating}</p>
                    <FaStar />
                  </div>
                </div>
              </div>

              <div className="p-4 text-orange-500 w-full transition-all duration-300 ">
                <div className="flex items-center justify-center gap-6 w-full ">
                  <h3 className="font-bold ">
                    {movie.title && movie.title.length > 20
                      ? movie.title.slice(0, 20)
                      : movie.title}
                  </h3>
                  <div className="flex items-center  gap-4 text-orange-500 text-sm">
                    <span className="flex items-center gap-1">
                      <IoIosThumbsUp className="text-orange-500" />
                      {movie._count?.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegComment className="text-orange-500" />
                      {movie._count?.comments || 0}
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
