"use client";
import React, { useState } from "react";
import MoviesGenresCard from "./MoviesGenresCard";
import GenreSlider from "@/app/components/movie/GenreSlider";

interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
}

interface MoviesByCategoryProps {
  movies: allMoviesType[];
  uniqueGenres: string[];
}

// const NEON_GENRE_CLASS =
//   "px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ease-in-out cursor-pointer";

export default function MoviesByCategory({
  movies,
  uniqueGenres,
}: MoviesByCategoryProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genres.includes(selectedGenre))
    : [];

  const handleGenreClick = (genre: string) => {
    setSelectedGenre((prev) => (prev === genre ? null : genre));
  };
  return (
    <div>
      <div className="mb-4">
        <GenreSlider
          uniqueGenres={uniqueGenres}
          selectedGenre={selectedGenre}
          onGenreClick={handleGenreClick}
        />
      </div>

      {selectedGenre && (
        <div className="pt-4">
          <h6 className="text-xl font-bold mb-4 text-white">
            Movies in: <span className="text-orange-500">{selectedGenre}</span>
          </h6>

          {filteredMovies.length > 0 ? (
            <MoviesGenresCard movies={filteredMovies} />
          ) : (
            <p className="text-gray-400 h-96 w-96">
              There are no movies in the {selectedGenre} category yet.
            </p>
          )}
        </div>
      )}

      {!selectedGenre && (
        <p className="text-gray-400 pt-4 h-96 w-96">
          Select a genre to see the movies.
        </p>
      )}
    </div>
  );
}
