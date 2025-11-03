"use client";
import { setWeeklyMovieAction } from "@/actions/movies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SetWeeklyMovieButton({ id }: { id: string }) {
  const [isSetMovie, setIsSetMovie] = useState(false);
  const router = useRouter();
  const handleSet = async () => {
    try {
      const res = await toast.promise(setWeeklyMovieAction(id), {
        loading: "Updating Movie...",
        success: "The film was set as the movie of the week",
        error: "Failed to update movie",
      });

      if (!res?.success) {
        router.refresh();
      }
    } finally {
      setIsSetMovie(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSet}
        disabled={isSetMovie}
        title="Set Movie"
        className="hover:scale-110 transition-all cursor-pointer duration-300  "
      >
        {isSetMovie ? (
          "..."
        ) : (
          <p className="bg-orange-500 px-2 py-1 rounded-md ">
            Choose the movie of the week
          </p>
        )}
      </button>
    </>
  );
}
