import { prisma } from "@lib/prisma";
import Hero from "./components/Hero";
import HomeBanner from "./components/HomeBanner";
import HomeMovies from "./components/homeMovies/HomeMovies";
import Latest_posts from "./components/Latest_posts";

import HomeBlogs from "./components/HomeBlogs";
import CategoryClient from "@/app/components/CategoryClient";
import HomeReadingBook from "./components/books/HomeReadingBook";
import ReadingStats from "@/app/components/ReadingStats";
import RandomMovie from "@/app/components/movie/RandomMovie";

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
    <div className="space-y-6">
      <Hero />
      <Latest_posts />
      <HomeMovies />
      <HomeBanner />
      <RandomMovie />
      <HomeReadingBook />
      <ReadingStats />
      <CategoryClient categories={categories} />
      <HomeBlogs categorySlug={selectedCategory || undefined} />
    </div>
  );
}
