"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TrailerModalProps {
  movieTitle: string;
  trailerUrl: string | null;
}

export default function TrailerModal({
  movieTitle,
  trailerUrl,
}: TrailerModalProps) {
  if (!trailerUrl) {
    return (
      <button
        className="mt-16 bg-gray-600 text-white rounded-md font-bold px-4 py-2 cursor-not-allowed"
        disabled
      >
        Trailer Not Available
      </button>
    );
  }

  const videoIdMatch = trailerUrl.match(
    /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/e\/)([^&"'>]+)/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
    : trailerUrl;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-4 md:mt-24  bg-orange-500 text-white rounded-md font-bold px-4 py-2 cursor-pointer  hover:bg-orange-700 transition-all duration-300 ">
            Watch Trailer
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px] p-0 border-none bg-transparent">
          <DialogHeader className="sr-only">
            <DialogTitle>{movieTitle} Trailer</DialogTitle>
          </DialogHeader>
          <div
            className="relative w-full"
            style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
              src={embedUrl}
              title={`${movieTitle} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
