"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategorySwiper({
  categories,
  onCategorySelect,
}: {
  categories: Category[];
  onCategorySelect: (slug: string | null) => void;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative md:px-12 bg-slate-800 py-2 text-sm -mb-2 md:rounded-md">
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10">
        <button className="categorySwiper-button-prev bg-orange-500 hover:bg-white p-2 rounded-full shadow-md transition cursor-pointer z-10">
          <IoIosArrowBack className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-10">
        <button className="categorySwiper-button-next bg-orange-500  hover:bg-white p-2 rounded-full shadow-md transition cursor-pointer z-10">
          <IoIosArrowForward className="w-5 h-5 text-gray-800 " />
        </button>
      </div>
      <Swiper
        spaceBetween={8}
        modules={[Navigation, FreeMode]}
        slidesPerView={"auto"}
        // slidesPerView={categories.length}
        freeMode={true}
        grabCursor={true}
        touchRatio={1.2}
        className="w-full py-2 "
        navigation={{
          prevEl: ".categorySwiper-button-prev",
          nextEl: ".categorySwiper-button-next",
        }}
      >
        <SwiperSlide className="!w-auto">
          <button
            onClick={() => {
              setActive(null);
              onCategorySelect(null);
            }}
            className={`px-4 py-2 rounded-full   text-slate-800 cursor-pointer ${
              active === null ? "bg-orange-500 text-slate" : "bg-gray-200"
            }`}
          >
            All
          </button>
        </SwiperSlide>

        {categories.map((cat) => (
          <SwiperSlide key={cat.id} className="!w-auto">
            <button
              onClick={() => {
                setActive(cat.slug);
                onCategorySelect(cat.slug);
              }}
              className={`px-4 py-2 rounded-full cursor-pointer hover:bg-orange-500 transition-colors duration-300 ${
                active === cat.slug ? "bg-orange-500 text-white" : "bg-white"
              }`}
            >
              {cat.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
