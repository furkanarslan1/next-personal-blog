import { socialLinks } from "@lib/constants/social";
import Link from "next/link";
import React from "react";

export default function HomeBanner() {
  return (
    <div className=" relative h-[500px] bg-[url('/home_banner.jpg')] bg-cover bg-center ">
      <span className="absolute inset-0 bg-black/40 z-0"></span>
      <div className="relative z-10 p-4">
        <div className="flex flex-col items-center md:items-start gap-14">
          <h3 className="text-orange-500 font-bold text-8xl">Follow Me</h3>
          <p className="text-white text-sm">
            Make sure to follow me on social media so you don't miss any of my
            posts
          </p>
          <ul className="flex items-center gap-8 text-sm  md:text-xl text-white">
            {socialLinks?.map((s) => (
              <li
                key={s.name}
                className="hover:scale-110 hover:text-slate-800 transition-all duration-300 text-4xl bg-orange-500 p-4 rounded-full "
              >
                <Link href={s.href}>{s.icon}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
