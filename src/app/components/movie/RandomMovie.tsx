import { getRandomMovieData } from "@/actions/movies";
import RandomMovieContent from "./RandomMovieContent";

export default async function RandomMovie() {
  const initialMovie = await getRandomMovieData();

  if (!initialMovie) {
    return (
      <div className="p-6 bg-gray-900 text-white text-center rounded-lg shadow-lg max-w-7xl mx-auto">
        <p className="text-xl font-semibold mb-2">Random Movie Discover</p>
        <p>No random movies found to play at the moment</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <RandomMovieContent initialMovie={initialMovie} />
    </div>
  );
}
