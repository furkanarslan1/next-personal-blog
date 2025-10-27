"use client";

import { Category } from "@prisma/client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface CategorySwiperProps {
  categories: Category[];
  selectedSlug: string | null;
  onCategoryClick: (slug: string) => void;
}

export default function CategorySwiper({
  categories,
  selectedSlug,
  onCategoryClick,
}: CategorySwiperProps) {
  return (
    <div className="relative md:px-12 bg-orange-500 rounded-md">
      <Swiper>
        {categories.map((category) => (
          <SwiperSlide key={category.id} style={{ width: "auto" }}>
            <button
              onClick={() => onCategoryClick(category.slug)}
              className={`... ${
                selectedSlug === category.slug
                  ? "bg-orange-600 text-white "
                  : "bg-gray-800 text-gray-300 rounded-md px-2 py-1"
              }`}
            >
              {category.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
