import { prisma } from "@lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdEdit } from "react-icons/md";

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

export default async function MoviesEditPage() {
  const movies = await getMovies();
  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h2 className="text-xl font-bold mb-2">All Movies</h2>
      <ul className="grid grid-cols-1 md:grid-cols-4  gap-4">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="flex flex-col items-center gap-2 border-2 border-orange-500 rounded-md py-4 "
          >
            <h2 className="font-bold">{movie.title}</h2>
            <div className="relative h-86 w-full">
              <Image
                src={movie.posterUrl || "/personal-blog-hero.webp"}
                alt={movie.title}
                fill
              />
            </div>
            <Link
              href={`/admin/myMovies/edit/${movie.id}`}
              className=" bg-orange-500 rounded-md px-4 py-2"
            >
              <MdEdit className="text-2xl text-white" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
