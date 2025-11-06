import { prisma } from "@lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";
import TrailerModal from "./components/TrailerModal";
import MovieCommentForm from "../components/MovieCommentForm";
import { auth } from "@/auth";

interface MovieDetailProps {
  params: {
    slug: string[];
  };
}

export default async function MoviesPage({ params }: MovieDetailProps) {
  // const { slug } = await params;
  const awaitedParams = await params;
  const slugArray = awaitedParams.slug;

  if (!slugArray || slugArray.length < 2) {
    notFound();
  }

  const categorySlug = slugArray[0];
  const movieSlug = slugArray[1];

  const movie = await prisma.movie.findUnique({ where: { slug: movieSlug } });

  if (!movie) {
    notFound();
  }

  const session = await auth();

  return (
    <div
      className="p-4 min-h-screen relative bg-cover  bg-center"
      style={{
        backgroundImage: `url('${movie.posterUrl}')`,
      }}
    >
      <span className="absolute inset-0 bg-black/80 z-0"></span>
      <div className="mt-16 p-6 text-white z-10 relative">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative h-96 w-full md:h-96 md:w-96">
            <Image
              src={movie.posterUrl || "/personal-blog-hero.jpg"}
              alt={movie.title}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-orange-500">
                {movie.title}
              </h1>
              <p className="text-slate-300 text-sm flex flex-col md:flex-row items-start md:items-center gap-2">
                <span className="text-orange-500 font-bold">category: </span>{" "}
                {movie.genres.join(", ")}
              </p>
            </div>
            <div className="space-y-4 text-slate-300">
              <div className="text-sm flex items-center gap-2">
                <span className="text-orange-500 font-bold">IMBD: </span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">
                    <FaStar />
                  </span>
                  <p>{movie.rating}</p>
                </div>
              </div>
              <p className="text-sm flex items-center gap-2">
                <span className="text-orange-500 font-bold">Year: </span>
                {movie.releaseYear}
              </p>
              <p className="text-sm flex flex-col md:flex-row items-start gap-2">
                <span className="text-orange-500 font-bold">Description: </span>
                {movie.description}
              </p>
              <TrailerModal
                movieTitle={movie.title}
                trailerUrl={movie.trailerUrl}
              />
              <section>
                <MovieCommentForm
                  movieId={movie.id}
                  isAuthenticated={!!session?.user}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
