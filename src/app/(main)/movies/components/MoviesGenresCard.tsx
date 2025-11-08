import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

interface MovieType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
}

interface MovieCardProps {
  movies: MovieType[];
}
export default function MoviesGenresCard({ movies }: MovieCardProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies ? (
        movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${
              movie.genres.length > 0
                ? movie.genres[0].toLowerCase()
                : "uncategorized"
            }/${movie.slug}`}
          >
            <div className=" relative  h-80 w-full rounded-xl overflow-hidden group cursor-pointer ">
              <Image
                src={movie.posterUrl || "/personal-blog-hero.webp"}
                alt={movie.title || "post image"}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-600"
              />
              <span className=" group-hover:absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/60 to-transparent"></span>

              <div className="group-hover:absolute bottom-0 p-4 text-orange-500 w-full transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold ">
                    {movie.title && movie.title.length > 20
                      ? movie.title.slice(0, 20)
                      : movie.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-300">
                    <p>{movie.rating}</p>
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>There is no movie</p>
      )}
    </div>
  );
}
