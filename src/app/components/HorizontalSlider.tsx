"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HorizontalSliderProps } from "@/types/horizontalSlider_type";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { IoIosThumbsUp } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

export default function HorizontalSlider({
  sliderItem,
}: HorizontalSliderProps) {
  return (
    <div className="relative">
      {/* custom navigation menu for pc */}
      {/* for left arrow */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10">
        <button className="swiper-button-prev bg-orange-500 hober:bg-white p-2 rounded-full shadow-md transition">
          <IoIosArrowBack className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      {/* for right arrow */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-10">
        <button className="swiper-button-next bg-orange-500 hover:bg-white p-2 rounded-full shadow-md transition">
          <IoIosArrowForward className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next", //to go forwad
          prevEl: ".swiper-button-prev", //to come back
        }}
        spaceBetween={16} //for card spacing
        slidesPerView={"auto"} //It allows multiple cards to be visible at the same time.
        grabCursor={true} //for mouse effect
        className="overflow-hidden"
      >
        {sliderItem?.map((slider, index) => (
          <SwiperSlide
            key={index}
            className="!w-[240px] sm:!w-[280px] md:!w-[320px]" //I have to set the width; unless I set the width, you can’t see the other posts.
          >
            <Link
              href={`/blogs/${slider.category?.slug || "general"}/${
                slider.slug
              }`}
              className="relative flex flex-col justify-end gap-2  rounded-md  text-white"
            >
              <div className="relative h-56">
                <Image
                  src={slider.imageUrl || "/personal-blog-hero.jpg"}
                  alt={slider.title || "post image"}
                  fill
                  className="object-contain object-top "
                />
              </div>

              <span className="absolute top-2 right-12 md:right-1/2 bg-orange-500 text-white rounded-2xl text-sm px-2">
                {slider.category?.name || "General"}
              </span>

              <div className="  text-slate-800 z-20  flex items-center justify-center gap-4">
                <h3 className="font-bold ">
                  {slider.title && slider.title.length > 20
                    ? slider.title.slice(0, 20)
                    : slider.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-800 text-sm">
                  <span className="flex items-center gap-1">
                    <IoIosThumbsUp className="text-orange-400" />
                    {slider._count?.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegComment className="text-orange-400" />
                    {slider._count?.comments || 0}
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
