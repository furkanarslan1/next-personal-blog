import SignIn from "@/app/components/sign-in";
import Hero from "./components/Hero";
import HeroInfo from "./components/HeroInfo";
import Latest_posts from "./components/Latest_posts";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <HeroInfo />
      <Latest_posts />
      <SignIn />
    </div>
  );
}
