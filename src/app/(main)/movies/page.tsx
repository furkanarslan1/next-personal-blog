import React from "react";
import Trailer from "./components/Trailer";
import { prisma } from "@lib/prisma";
import MovieCard from "@/app/components/movie/MovieCard";
import MoviesByCategory from "./components/MoviesByCategory";
import { movieCategories } from "@lib/constants/movieCategories";

interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
}

// async function getMovies(): Promise<allMoviesType[]> {
//   try {
//     const allMovies = await prisma.movie.findMany({
//       select: {
//         id: true,
//         title: true,
//         posterUrl: true,
//         rating: true,
//         status: true,
//         genres: true,
//         slug: true,
//         _count: { select: { likes: true } },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return allMovies;
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);
//     return [];
//   }
// }

async function getWeeklyMovie() {
  const weeklyMovieSetting = await prisma.setting.findUnique({
    where: { key: "weekly_movie_id" },
  });

  if (!weeklyMovieSetting) return null;

  const weeklyMovie = await prisma.movie.findUnique({
    where: { id: weeklyMovieSetting.value },
    select: {
      title: true,
      trailerUrl: true,
      slug: true,
      genres: true,
    },
  });

  return weeklyMovie;
}
const PAGE_SIZE = 12;
export default async function Movies({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const currentPage = Math.max(1, page);

  const rawCategory = searchParams.category;
  const selectedCategory = Array.isArray(rawCategory)
    ? rawCategory[0] || undefined
    : rawCategory || undefined;

  const whereClause = selectedCategory
    ? { genres: { has: selectedCategory } }
    : {};

  const totalMoviesCount = await prisma.movie.count({ where: whereClause });
  const totalPages = Math.ceil(totalMoviesCount / PAGE_SIZE);

  const NEON_TITLE_CLASS =
    "text-orange-500 font-extrabold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] transition duration-300";
  const movies = await prisma.movie.findMany({
    where: whereClause,
    select: {
      id: true,
      title: true,
      posterUrl: true,
      rating: true,
      status: true,
      genres: true,
      slug: true,
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE,
    skip: (currentPage - 1) * PAGE_SIZE,
  });
  const weeklyMovieData = await getWeeklyMovie();

  const uniqueGenres = movieCategories;
  return (
    <div className="bg-black min-h-screen p-4">
      <Trailer movie={weeklyMovieData} />
      <section className="space-y-12">
        <div>
          <h5 className={`mb-4 ${NEON_TITLE_CLASS}`}>I Watched Movies</h5>
          <MovieCard movies={movies} filter="WATCHED" navPrefix="watched" />
        </div>
        <div>
          <h5 className={`mb-4 ${NEON_TITLE_CLASS}`}>Movies to Watch</h5>
          <MovieCard movies={movies} filter="PLAN_TO_WATCH" navPrefix="plan" />
        </div>
        <div>
          <h5 className={`mb-4 ${NEON_TITLE_CLASS}`}>Actions</h5>
          <MovieCard movies={movies} filter="action" navPrefix="plan" />
        </div>

        <div>
          <h5 className={`mb-4 ${NEON_TITLE_CLASS}`}>Movies by Genre</h5>
          <MoviesByCategory
            movies={movies}
            uniqueGenres={uniqueGenres}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedCategory={selectedCategory}
          />
        </div>
      </section>
    </div>
  );
}
