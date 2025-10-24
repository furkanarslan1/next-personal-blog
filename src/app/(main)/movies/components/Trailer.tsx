import React from "react";

export default function Trailer() {
  // YouTube video ID (ex: Oppenheimer trailer)
  const trailerId = "uYPbbksJxIg";
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
          <h2 className="text-white text-3xl md:text-5xl font-bold">
            movie of the week
          </h2>
          <p className="text-gray-200 mt-2 text-sm md:text-base max-w-xl">
            You can watch this this week
          </p>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium w-fit transition">
            Watch Now
          </button>
        </div>
      </section>
    </div>
  );
}
