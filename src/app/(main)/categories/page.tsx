import { CategoryType } from "@/types/category_type";
import { prisma } from "@lib/prisma";
import Link from "next/link";
import React from "react";

async function getCategories(): Promise<CategoryType[]> {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
  return categories;
}

export default async function CategoriesPage() {
  const allCategories = await getCategories();

  if (!allCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center font-extrabold text-slate-800">
        <p>There is no category</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="bg-gradient-to-tl from-black to-black/60 h-16"></div>

      <div className=" grid grid-cols-2 md:grid-cols-6 p-2 gap-4">
        {allCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blogs?category=${cat.slug} `}
            className="h-32 w-32 md:h-52 md:w-52 rounded-md bg-gradient-to-r from-orange-500 to-transparent hover:bg-orange-500 transition-all duration-300 flex items-center justify-center text-white font-bold text-2xl"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
