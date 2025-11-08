import { prisma } from "@lib/prisma";
import React from "react";
import MovieCard from "@/app/components/movie/MovieCard";
import MovieSection from "@/app/components/movie/MovieSection";

interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
}

type FilterPrefix = "watched" | "plan";
const NEON_TITLE_CLASS =
  "text-slate-800 font-extrabold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] transition duration-300";

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
//       },
//       orderBy: { createdAt: "desc" },
//     });
//     return allMovies;
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);

//     return [];
//   }
// }

const PAGE_SIZE = 12;

async function getInitialMovies(
  statusFilter: "WATCHED" | "PLAN_TO_WATCH"
): Promise<{ movies: allMoviesType[]; hasMore: boolean }> {
  try {
    const allMovies = await prisma.movie.findMany({
      where: { status: statusFilter },
      select: {
        id: true,
        title: true,
        posterUrl: true,
        rating: true,
        status: true,
        genres: true,
        slug: true,
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE + 1, // Bir fazla çekerek hasMore kontrolü
    });

    const hasMore = allMovies.length > PAGE_SIZE;
    const movies = allMovies.slice(0, PAGE_SIZE);

    return { movies, hasMore };
  } catch (error) {
    console.error("Failed to fetch initial movies:", error);
    return { movies: [], hasMore: false };
  }
}

export default async function HomeMovies() {
  const [watchedData, planToWatchData] = await Promise.all([
    getInitialMovies("WATCHED"),
    getInitialMovies("PLAN_TO_WATCH"),
  ]);
  return (
    <div className=" md:rounded-md p-4 max-w-7xl mx-auto">
      <section className="space-y-12">
        <MovieSection
          initialMovies={watchedData.movies}
          filterStatus="WATCHED"
          title="I Watched Movies"
          navPrefix="watched"
        />

        <MovieSection
          initialMovies={planToWatchData.movies}
          filterStatus="PLAN_TO_WATCH"
          title="Movies to Watch"
          navPrefix="plan"
        />
      </section>
    </div>
  );
}
