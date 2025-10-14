import React from "react";
export default function HeroInfo() {
  return (
    <div className="lg:hidden p-4 bg-slate-800">
      <div className="grid grid-cols-1 gap-6 text-white text-sm">
        <div className="border-2 border-orange-500 rounded-md p-4 flex flex-col justify-center items-start gap-2 backdrop-blur-sm bg-black/10 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
          <h5 className="font-bold border-b-2">Experience</h5>
          <p>
            {`This blog was created to share what I've learned and experienced over the years. Here, you'll find not only successes but also mistakes and the lessons I've learned along the way.`}
          </p>
        </div>

        <div className="border-2 border-orange-500 rounded-md p-4 flex flex-col justify-center items-start gap-2 backdrop-blur-sm bg-black/10 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
          <h5 className="font-bold border-b-2">Authentic Journey</h5>
          <p>
            {`Every post is part of a journey blended with personal growth, productivity, and technology. Real stories, honest experiences, and genuine reflections.`}
          </p>
        </div>

        <div className="border-2 border-orange-500 rounded-md p-4 flex flex-col justify-center items-start gap-2 backdrop-blur-sm bg-black/0  hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
          <h5 className="font-bold border-b-2">Join the Community</h5>
          <p>
            {`Your thoughts matter! Leave a comment, share an idea, or just say "Hi". This page exists to bring together people who think alike and inspire each other.`}
          </p>
        </div>
      </div>
    </div>
  );
}
