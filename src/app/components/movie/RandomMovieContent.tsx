"use client";
import { MdChangeCircle } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { getRandomMovieData, RandomMovieData } from "@/actions/movies";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FaStar } from "react-icons/fa";

interface RandomMovieContentProps {
  initialMovie: RandomMovieData;
}

function DiscoverButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md cursor-pointer hover:bg-slate-950 transition-colors disabled:bg-gray-500 max-w-7xl mx-auto"
    >
      {pending ? "Searching Movie..." : children}
    </button>
  );
}

export default function RandomMovieContent({
  initialMovie,
}: RandomMovieContentProps) {
  const [state, formAction] = useActionState(getRandomMovieData, initialMovie);
  const currentMovie = state || initialMovie;

  if (!currentMovie) {
    return (
      <p className="text-center text-white">
        Movie information could not be loaded.
      </p>
    );
  }

  const detailUrl = `/movies/${currentMovie.categorySlug}/${currentMovie.movieSlug}`;
  return (
    // <div className="bg-[url('/random_movie_pattern.webp')] h-full bg-contain bg-center md:rounded-md">
    <div className=" h-full  md:rounded-md">
      <div className="flex flex-col items-center p-4 bg-transparent   text-white max-w-sm mx-auto shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-center text-slate-800">
          Random Movie Discover
        </h2>

        <Link href={detailUrl} className="   flex flex-col items-center">
          <div className="relative w-40 h-60 mb-3 mx-auto shadow-xl rounded-lg overflow-hidden border-2 border-orange-500">
            <Image
              src={currentMovie.posterUrl || "/default-movie-cover.webp"}
              alt={currentMovie.title}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800  ">
            {currentMovie.title}
          </h3>
        </Link>

        <div className="mt-2 space-y-1 text-center">
          <div className="flex items-center gap-2 text-sm">
            <p className="font-bold text-slate-800 ">Rating:</p>
            <p className="flex items-center gap-1 text-slate-800">
              {currentMovie.rating || "N/A"}{" "}
              <span>
                <FaStar className="text-orange-500" />
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 w-full flex flex-col gap-2">
          <Link
            href={detailUrl}
            className="w-full text-center px-4 py-2 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <RiMovie2Fill className=" text-2xl" />
              <p>The movie details</p>
            </div>
          </Link>

          <form action={formAction} className="">
            <DiscoverButton>
              <div className="flex items-center justify-center gap-2">
                <MdChangeCircle className="text-white text-2xl" />
                <p>Discover Other Random Movies</p>
              </div>
            </DiscoverButton>
          </form>
        </div>
      </div>
    </div>
  );
}
