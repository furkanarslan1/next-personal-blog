"use client";
import React from "react";

import { useRouter } from "next/navigation";
import CategorySwiper from "@/app/components/CategorySwiper";

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface CategoryClientProps {
  categories: Category[];
  onCategorySelect?: (slug: string | null) => void;
}

export default function BlogsCategoryClient({
  categories,
  onCategorySelect,
}: CategoryClientProps) {
  const router = useRouter();
  console.log("Categories:", categories);

  const handleCategorySelect = (slug: string | null) => {
    if (slug) router.push(`/blogs/?category=${slug}`, { scroll: false });
    else router.push("/blogs", { scroll: false });
  };

  return (
    <CategorySwiper
      categories={categories}
      onCategorySelect={handleCategorySelect}
    />
  );
}
