"use client";

import { useRouter } from "next/navigation";
import CategorySwiper from "./CategorySwiper";

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface CategoryClientProps {
  categories: Category[];
  onCategorySelect?: (slug: string | null) => void;
}

export default function CategoryClient({
  categories,
  onCategorySelect,
}: CategoryClientProps) {
  const router = useRouter();
  console.log("Categories:", categories);

  const handleCategorySelect = (slug: string | null) => {
    if (slug) router.push(`/?category=${slug}`, { scroll: false });
    else router.push("/", { scroll: false });
  };

  return (
    <CategorySwiper
      categories={categories}
      onCategorySelect={handleCategorySelect}
    />
  );
}
