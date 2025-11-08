import Link from "next/link";
import React from "react";
import { RiGridFill } from "react-icons/ri";
import { socialLinks } from "@lib/constants/social";

interface CategoriesType {
  slug: string;
  name: string;
}

interface FooterProps {
  categories: CategoriesType[];
}
export default function Footer({ categories }: FooterProps) {
  return (
    <div className="p-6 bg-slate-800 pb-24 md:pb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start  gap-4 justify-around">
        <div className="flex flex-col items-center gap-2 ">
          <Link href="/" className="flex items-center gap-2 ">
            <p className="font-bold text-transparent bg-gradient-to-r bg-clip-text from-orange-500  to-slate-300 text-xl md:text-2xl">
              Personal Blog
            </p>
            <RiGridFill className="text-orange-500 text-4xl" size={34} />
          </Link>
          <p className="text-sm text-slate-300">
            &copy; 2025 Furkan Arslan. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 ">
          <h6 className="text-orange-500 font-bold text-2xl border-b-2 border-orange-500">
            Categories
          </h6>
          <ul className="">
            {categories &&
              categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blogs?category=${cat.slug} `}
                    className="text-slate-300 hover:text-orange-500 transition-colors duration-300"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="text-slate-300 flex flex-col items-center gap-4">
          <h6 className="text-orange-500 font-bold text-2xl border-b-2 border-orange-500">
            Contact Me
          </h6>
          <ul className="flex  items-center gap-8 text-sm  md:text-xl text-white">
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
