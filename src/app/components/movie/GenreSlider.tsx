"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface GenreSliderProps {
  uniqueGenres: string[];
  selectedGenre: string | null;
  onGenreClick: (genre: string) => void;
}

const NEON_GENRE_CLASS =
  "px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ease-in-out cursor-pointer text-nowrap";

export default function GenreSlider({
  uniqueGenres,
  selectedGenre,
  onGenreClick,
}: GenreSliderProps) {
  return (
    <div className="relative md:px-12">
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10">
        <button className="genres-button-prev bg-orange-500 hover:bg-white p-2 rounded-full shadow-md transition cursor-pointer z-10">
          <IoIosArrowBack className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-10">
        <button className="genres-button-next bg-orange-500  hover:bg-white p-2 rounded-full shadow-md transition cursor-pointer z-10">
          <IoIosArrowForward className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={"auto"}
        freeMode={true}
        className="w-full py-2 "
        navigation={{
          prevEl: ".genres-button-prev",
          nextEl: ".genres-button-next",
        }}
      >
        {uniqueGenres.map((genre) => (
          <SwiperSlide key={genre} style={{ width: "auto" }}>
            <button
              onClick={() => onGenreClick(genre)}
              className={`${NEON_GENRE_CLASS} ${
                selectedGenre === genre
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-500/50 scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white"
              }`}
            >
              {genre}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
