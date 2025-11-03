import { prisma } from "@lib/prisma";
import Image from "next/image";
import React from "react";
import MovieOfStatusButton from "./components/MovieOfStatusButton";
interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
}

async function getMovies(): Promise<allMoviesType[]> {
  try {
    const allMovies = await prisma.movie.findMany({
      select: {
        id: true,
        title: true,
        posterUrl: true,
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return allMovies;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}

export default async function updateStatus() {
  const movies = await getMovies();

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h2 className="text-xl font-bold mb-2">All Movies</h2>
      <ul className="grid grid-cols-1 md:grid-cols-4  gap-4">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center gap-2  rounded-md py-4 "
          >
            <h2 className="font-bold">{movie.title}</h2>
            <div className="relative h-86 w-full">
              <Image
                src={movie.posterUrl || "/personal-blog-hero.jpg"}
                alt={movie.title}
                fill
              />
            </div>
            <MovieOfStatusButton
              movieId={movie.id}
              currentStatus={movie.status}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
