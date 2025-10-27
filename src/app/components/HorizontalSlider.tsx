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

export default function HorizontalSlider({
  sliderItem,
}: HorizontalSliderProps) {
  return (
    <div className="relative">
      {/* custom navigation menu for pc */}
      {/* for left arrow */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10">
        <button className="swiper-button-prev bg-white/70 hober:bg-white p-2 rounded-full shadow-md transition">
          <IoIosArrowBack className="w-5 h-5 text-gray-800" />
        </button>
      </div>
      {/* for right arrow */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 z-10">
        <button className="swiper-button-next bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition">
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
            {/* <Link
              href={`/blogs/${slider.category?.slug || "general"}/${
                slider.slug
              }`}
              className="flex flex-col items-start justify-center gap-2 border-4 border-orange-500 rounded-md bg-slate-800 text-white "
            >
              <div className="relative h-48 w-full  ">
                <Image
                  src={slider.imageUrl || "/personal-blog-hero.jpg"}
                  alt={slider.title || "post image"}
                  fill
                  className="object-cover object-center rounded-md"
                />
                <span className="absolute bottom-2 right-4 bg-orange-500 text-white rounded-2xl text-sm px-2">
                  {slider.category?.name || "General"}
                </span>
              </div>
              <div className="p-4 ">
                <h3 className="font-bold ">
                  {slider.title && slider.title.length > 20
                    ? slider.title.slice(0, 20)
                    : slider.title}
                </h3>
              </div>
            </Link> */}

            <Link
              href={`/blogs/${slider.category?.slug || "general"}/${
                slider.slug
              }`}
              className="relative h-56 flex flex-col justify-end gap-2 border-4 border-orange-500 rounded-md bg-slate-800 text-white"
            >
              <Image
                src={slider.imageUrl || "/personal-blog-hero.jpg"}
                alt={slider.title || "post image"}
                fill
                className="object-cover object-top "
              />
              <span className="absolute top-2 right-4 bg-orange-500 text-white rounded-2xl text-sm px-2">
                {slider.category?.name || "General"}
              </span>

              <div className=" bg-black/60 text-orange-500 z-20 p-4">
                <h3 className="font-bold ">
                  {slider.title && slider.title.length > 20
                    ? slider.title.slice(0, 20)
                    : slider.title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
