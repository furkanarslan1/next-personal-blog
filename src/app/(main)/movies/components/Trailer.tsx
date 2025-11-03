import Link from "next/link";
import React from "react";

interface TrailerProps {
  movie: {
    title: string;
    trailerUrl: string | null;
    slug: string;

    genres: string[];
  } | null;
}

const extractYouTubeId = (url: string) => {
  if (!url) return null;
  const regex =
    /(?:\?v=|\/embed\/|\/watch\?v=|\/\d\/|youtu\.be\/|\/v=)([^#\&\?]*).*/;
  const match = url.match(regex);
  return match && match[1].length === 11 ? match[1] : null;
};

export default function Trailer({ movie }: TrailerProps) {
  // YouTube video ID (ex: Oppenheimer trailer)
  const fallbackId = "uYPbbksJxIg";

  const trailerId = movie?.trailerUrl
    ? extractYouTubeId(movie.trailerUrl)
    : fallbackId;
  const title = movie?.title || "Movie of the week";

  const firstGenre = movie?.genres?.[0] ? movie.genres[0].toLowerCase() : "all";

  return (
    <div>
      <section className="relative w-full">
        {/* Responsive video  */}
        <div className="relative w-full pb-[160%]   md:pb-[48.25%] overflow-hidden ">
          <iframe
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}`}
            title="Movie Trailer"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* overlay + text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-12">
          <h2 className="text-white text-3xl md:text-5xl font-bold">{title}</h2>
          <p className="text-gray-200 mt-2 text-sm md:text-base max-w-xl">
            This week's recommended movie
          </p>
          <Link
            href={`/movies/${firstGenre}/${movie?.slug}`}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium w-fit transition"
          >
            Detail
          </Link>
        </div>
      </section>
    </div>
  );
}
