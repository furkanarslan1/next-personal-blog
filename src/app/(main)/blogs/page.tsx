import { prisma } from "@lib/prisma";
import React from "react";
import BlogItems from "./components/BlogItems";
import BlogsCategoryClient from "./components/BlogsCategoryClient";

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
      <div className="bg-[url('/blogs_header_2.jpg')] bg-cover bg-top  h-56 md:h-96 relative flex items-center justify-center p-4">
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
