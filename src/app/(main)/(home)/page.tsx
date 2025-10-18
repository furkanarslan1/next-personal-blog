import Hero from "./components/Hero";
import HeroInfo from "./components/HeroInfo";
import Latest_posts from "./components/Latest_posts";

export default async function Home() {
  return (
    <div className="">
      <Hero />
      <HeroInfo />
      <Latest_posts />
    </div>
  );
}
