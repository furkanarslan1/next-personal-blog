import Hero from "./components/Hero";
import HeroInfo from "./components/HeroInfo";
import Latest_posts from "./components/Latest_posts";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="">
      <Hero />
      <HeroInfo />
      <Latest_posts />
    </div>
  );
}
