"use client";
import React, { useState, useEffect } from "react";

import { getPaginatedMovies } from "@/actions/movies";
import MovieCard from "./MovieCard";

const PAGE_SIZE = 12;

interface MovieType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
}

interface MovieSectionProps {
  initialMovies: MovieType[];
  filterStatus: "WATCHED" | "PLAN_TO_WATCH";
  title: string;
  navPrefix: string;
}

export default function MovieSection({
  initialMovies,
  filterStatus,
  title,
  navPrefix,
}: MovieSectionProps) {
  const [movies, setMovies] = useState<MovieType[]>(initialMovies);
  const [skip, setSkip] = useState(PAGE_SIZE);
  const [hasMore, setHasMore] = useState(initialMovies.length === PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialMovies.length < PAGE_SIZE) {
      setHasMore(false);
    } else {
      setHasMore(initialMovies.length === PAGE_SIZE);
    }
  }, [initialMovies]);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const result = await getPaginatedMovies({
      skip: skip,
      take: PAGE_SIZE,
      statusFilter: filterStatus,
    });
    setLoading(false);

    setMovies((prevMovies) => [...prevMovies, ...result.movies]);
    setSkip((prevSkip) => prevSkip + PAGE_SIZE);
    setHasMore(result.hasMore);
  };

  const NEON_TITLE_CLASS =
    "text-orange-500 font-extrabold text-2xl md:text-3xl drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] transition duration-300";

  return (
    <div>
        <h5 className={`mb-4 ${NEON_TITLE_CLASS}`}>{title}</h5>
      <MovieCard
        movies={movies}
        filter={filterStatus}
        navPrefix={navPrefix}
        onReachEnd={loadMore}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}
