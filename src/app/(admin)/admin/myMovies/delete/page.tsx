import { prisma } from "@lib/prisma";
import React from "react";
import DeleteMovieButton from "./components/DeleteMovieButton";
import Image from "next/image";

interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
}

async function getMovies(): Promise<allMoviesType[]> {
  const allMovies = await prisma.movie.findMany({
    select: {
      id: true,
      title: true,
      posterUrl: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return allMovies;
}

export default async function DeleteMoviePage() {
  const movies = await getMovies();
  return (
    <div className="p-4 bg-black text-white h-screen">
      <h2 className="text-xl font-bold mb-2">All Movies</h2>
      <ul className="grid grid-cols-1 md:grid-cols-4  gap-4">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center gap-2 border-2 border-orange-500 rounded-md py-4 "
          >
            <h2 className="font-bold">{movie.title}</h2>
            <div className="relative h-56 w-full">
              <Image
                src={movie.posterUrl || "/personal-blog-hero.jpg"}
                alt={movie.title}
                fill
              />
            </div>
            <DeleteMovieButton id={movie.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
