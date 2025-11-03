import { prisma } from "@lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import MovieEditForm from "./components/MovieEditForm";

interface EditPageProps {
  params: {
    movieId: string;
  };
}

async function getMovieForEdit(movieId: string) {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
    select: {
      id: true,
      title: true,
      posterUrl: true,
      rating: true,
      status: true,
      genres: true,
      slug: true,
      trailerUrl: true,
      description: true,
      backgroundUrl: true,
      releaseYear: true,
    },
  });
  return movie;
}

export default async function MovieEditPage({ params }: EditPageProps) {
  const resolvedParams = await params;
  const movie = await getMovieForEdit(resolvedParams.movieId);

  if (!movie) {
    notFound();
  }
  return (
    <div>
      <MovieEditForm movieData={movie} />
    </div>
  );
}
