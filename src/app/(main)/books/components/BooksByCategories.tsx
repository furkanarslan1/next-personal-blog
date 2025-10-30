"use client";
import GenreSlider from "@/app/components/movie/GenreSlider";
import React, { useState } from "react";
import BookCard from "./BookCard";

interface allBooksType {
  id: string;
  title: string;
  coverImageUrl: string | null;
  myRating: number | null;
  status: "READ" | "READING" | "PLAN_TO_READ";
  genres: string[];
  slug: string;
}

interface BooksByCategoryProps {
  books: allBooksType[];
  uniqueGenres: string[];
}
export default function BooksByCategories({
  books,
  uniqueGenres,
}: BooksByCategoryProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : [];

  const handleGenreClick = (genre: string) => {
    setSelectedGenre((prev) => (prev === genre ? null : genre));
  };
  return (
    <div>
      <GenreSlider
        uniqueGenres={uniqueGenres}
        selectedGenre={selectedGenre}
        onGenreClick={handleGenreClick}
      />

      {selectedGenre && (
        <div className="pt-4">
          <h6 className="text-xl font-bold mb-4 text-white">
            Books in: <span className="text-orange-500">{selectedGenre}</span>
          </h6>

          {filteredBooks.length > 0 ? (
            <BookCard books={filteredBooks} />
          ) : (
            <p className="text-gray-400 h-96 w-96 p-6">
              There are no book in the {selectedGenre} category yet.
            </p>
          )}
        </div>
      )}

      {!selectedGenre && (
        <p className="text-gray-400 pt-4 h-96 w-96">
          Select a genre to see the book.
        </p>
      )}
    </div>
  );
}
