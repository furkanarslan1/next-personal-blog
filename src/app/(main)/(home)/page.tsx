import { prisma } from "@lib/prisma";
import Hero from "./components/Hero";
import HomeBanner from "./components/HomeBanner";
import HomeMovies from "./components/homeMovies/HomeMovies";
import Latest_posts from "./components/Latest_posts";

import HomeBlogs from "./components/HomeBlogs";
import CategoryClient from "@/app/components/CategoryClient";
import HomeReadingBook from "./components/books/HomeReadingBook";

export default async function Home({
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
    <div className="space-y-4">
      <Hero />
      <Latest_posts />
      <HomeMovies />
      <HomeBanner />
      <HomeReadingBook />
      <CategoryClient categories={categories} />
      <HomeBlogs categorySlug={selectedCategory || undefined} />
    </div>
  );
}
