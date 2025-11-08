import { prisma } from "@lib/prisma";
import React from "react";
import BlogItems from "./components/BlogItems";
import BlogsCategoryClient from "./components/BlogsCategoryClient";
import Image from "next/image";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  const { category } = await searchParams;
  const selectedCategory = category || null;
  return (
    <div>
      <div className=" h-56 md:h-96 relative flex items-center justify-center p-4">
        <Image
          src="/blogs_header_2.webp"
          alt="reading_states_image"
          fill
          className="object-cover object-top"
        />
        <span className="absolute inset-0 bg-black/60"></span>
        <p className="relative  text-white text-3xl md:text-6xl font-bold ">
          The Written Journey
        </p>
      </div>
      <div>
        <BlogsCategoryClient categories={categories} />
        <BlogItems categorySlug={selectedCategory || undefined} />
      </div>
    </div>
  );
}
