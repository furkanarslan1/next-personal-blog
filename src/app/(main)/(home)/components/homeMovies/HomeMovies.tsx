import { prisma } from "@lib/prisma";
import React from "react";
import MovieCard from "@/app/components/movie/MovieCard";

interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genre?: string | null;
}

async function getMovies(): Promise<allMoviesType[]> {
  const allMovies = await prisma.movie.findMany({
    select: {
      id: true,
      title: true,
      posterUrl: true,
      rating: true,
      status: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return allMovies;
}

export default async function HomeMovies() {
  const movies = await getMovies();
  return (
    <div className="bg-black p-4">
      <section className="space-y-12">
        <div>
          <h5 className="text-orange-500 mb-4 font-bold text-2xl">
            I Watched Movies
          </h5>
          <MovieCard movies={movies} filter="WATCHED" />
        </div>
        <div>
          <h5 className="text-orange-500 mb-4 font-bold text-2xl">
            Movies to Watch
          </h5>
          <MovieCard movies={movies} filter="PLAN_TO_WATCH" />
        </div>
      </section>
    </div>
  );
}
