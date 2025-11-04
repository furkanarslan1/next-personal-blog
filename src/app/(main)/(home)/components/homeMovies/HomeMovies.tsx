import { prisma } from "@lib/prisma";
import React from "react";
import MovieCard from "@/app/components/movie/MovieCard";

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
  "text-orange-500 font-extrabold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] transition duration-300";

async function getMovies(): Promise<allMoviesType[]> {
  try {
    const allMovies = await prisma.movie.findMany({
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
    });
    return allMovies;
  } catch (error) {
    console.error("Failed to fetch movies:", error);

    return [];
  }
}

export default async function HomeMovies() {
  const movies = await getMovies();
  return (
    <div className="bg-[url('/cinema_bg_4.jpg')] bg-contain md:rounded-md p-4 max-w-7xl mx-auto">
      <section className="space-y-12">
        <div>
          <h5 className={`mb-4 ${NEON_TITLE_CLASS}`}>I Watched Movies</h5>
          <MovieCard movies={movies} filter="WATCHED" navPrefix="watched" />
        </div>
        <div>
          <h5 className={`mb-4 ${NEON_TITLE_CLASS}`}>Movies to Watch</h5>
          <MovieCard movies={movies} filter="PLAN_TO_WATCH" navPrefix="plan" />
        </div>
      </section>
    </div>
  );
}
