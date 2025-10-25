import HorizontalSlider from "@/app/components/HorizontalSlider";
import { HorizontalSliderItem } from "@/types/horizontalSlider_type";
import React from "react";

const slider_item: HorizontalSliderItem[] = [
  {
    title: "Hello There!",
    image: "/personal-blog-hero.jpg",
    description:
      "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laborum neque explicabo veritatis atque corporis porro sapiente at nam quam?",
    category: "Travel",
  },
  {
    title: "Hello There!",
    image: "/personal-blog-hero.jpg",
    description:
      "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laborum neque explicabo veritatis atque corporis porro sapiente at nam quam?",
    category: "Travel",
  },
  {
    title: "Hello There!",
    image: "/personal-blog-hero.jpg",
    description:
      "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laborum neque explicabo veritatis atque corporis porro sapiente at nam quam?",
    category: "Travel",
  },
  {
    title: "Hello There!",
    image: "/personal-blog-hero.jpg",
    description:
      "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laborum neque explicabo veritatis atque corporis porro sapiente at nam quam?",
    category: "Travel",
  },
  {
    title: "Hello There!",
    image: "/personal-blog-hero.jpg",
    description:
      "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laborum neque explicabo veritatis atque corporis porro sapiente at nam quam?",
    category: "Travel",
  },
  {
    title: "Hello There!",
    image: "/personal-blog-hero.jpg",
    description:
      "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laborum neque explicabo veritatis atque corporis porro sapiente at nam quam?",
    category: "Travel",
  },
];

export default function Latest_posts() {
  return (
    <div className="p-4 ">
      <h5 className="text-2xl text-slate-800 font-extrabold mb-2">
        My Latest Posts
      </h5>
      <div className="">
        <HorizontalSlider sliderItem={slider_item} />
      </div>
    </div>
  );
}
