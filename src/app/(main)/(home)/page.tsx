import Hero from "./components/Hero";
import HeroInfo from "./components/HeroInfo";
import HomeBanner from "./components/HomeBanner";
import HomeMovies from "./components/homeMovies/HomeMovies";
import Latest_posts from "./components/Latest_posts";

export default async function Home() {
  return (
    <div className="space-y-4">
      <Hero />
      <Latest_posts />
      <HomeMovies />
      <HomeBanner />
      <Latest_posts />
    </div>
  );
}
