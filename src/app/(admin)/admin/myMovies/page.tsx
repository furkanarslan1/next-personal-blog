import Link from "next/link";
import React from "react";

export default function MyMovies() {
  return (
    <div className="bg-black h-screen text-white">
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Link
          href="/admin/myMovies/create"
          className="p-4 bg-orange-500  rounded-md hover:bg-white transition-all duration-300 cursor-pointer font-bold hover:text-orange-500"
        >
          Add a movie
        </Link>
        <Link
          href="/admin/myMovies/delete"
          className="p-4 bg-orange-500  rounded-md hover:bg-white transition-all duration-300 cursor-pointer font-bold hover:text-orange-500"
        >
          Delete a movie
        </Link>
      </div>
    </div>
  );
}
