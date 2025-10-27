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

export default async function Movies() {
  const NEON_TITLE_CLASS =
    "text-orange-500 font-extrabold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] transition duration-300";
  const movies = await getMovies();

  const uniqueGenres = movieCategories;
  return (
    <div className="bg-black p-4">
      <Trailer />
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
          {/* Yeni bileşenimize tüm filmleri ve benzersiz kategorileri gönderiyoruz */}
          <MoviesByCategory movies={movies} uniqueGenres={uniqueGenres} />
        </div>
      </section>
    </div>
  );
}
