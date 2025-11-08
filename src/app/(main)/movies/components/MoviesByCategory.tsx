"use client";
import React, { useState } from "react";
import MoviesGenresCard from "./MoviesGenresCard";
import GenreSlider from "@/app/components/movie/GenreSlider";
import { useRouter, usePathname } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
  _count: { likes: number; comments: number };
}

interface MoviesByCategoryProps {
  movies: allMoviesType[];
  uniqueGenres: string[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string | undefined;
}

export default function MoviesByCategory({
  movies,
  uniqueGenres,
  currentPage,
  totalPages,
  selectedCategory,
}: MoviesByCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleGenreClick = (genre: string) => {
    const newCategory = selectedCategory === genre ? undefined : genre;
    const newSearchParams = new URLSearchParams();
    if (newCategory) {
      newSearchParams.set("category", newCategory);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const createPageLink = (page: number) => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    if (page > 1) {
      params.set("page", page.toString());
    }
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="min-h-screen">
      <div className="mb-4">
        <GenreSlider
          uniqueGenres={uniqueGenres}
          selectedGenre={selectedCategory ?? null}
          onGenreClick={handleGenreClick}
        />
      </div>
      {selectedCategory ? (
        <div className="pt-4">
          <h6 className="text-xl font-bold mb-4 text-white">
            Movies in:
            <span className="text-orange-500">{selectedCategory}</span>
          </h6>

          {movies.length > 0 ? (
            <>
              <MoviesGenresCard movies={movies} />

              <div className="mt-8 mb-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {currentPage > 1 ? (
                        <PaginationPrevious
                          href={createPageLink(currentPage - 1)}
                        />
                      ) : (
                        <PaginationPrevious className="opacity-50 pointer-events-none bg-white" />
                      )}
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href={createPageLink(pageNumber)}
                            isActive={pageNumber === currentPage}
                            className={
                              pageNumber === currentPage
                                ? "bg-orange-500 text-white hover:bg-orange-600"
                                : "bg-white text-black hover:bg-gray-700"
                            }
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      {currentPage < totalPages ? (
                        <PaginationNext
                          className=""
                          href={createPageLink(currentPage + 1)}
                        />
                      ) : (
                        <PaginationNext className="opacity-50 pointer-events-none bg-white" />
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          ) : (
            <p className="text-gray-400 h-96 w-96">
              There are no movies in the {selectedCategory}
              category yet.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-400 pt-4 h-96 w-96">
          Select a genre to see the movies.
        </p>
      )}
    </div>
  );
}
