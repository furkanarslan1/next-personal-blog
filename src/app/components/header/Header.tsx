"use client";
import React from "react";

import { category } from "../../../../lib/constants/navigation";
import Link from "next/link";
import { RiGridFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-around gap-4 px-6 h-16 bg-transparent text-white border-b-1 border-slate-400">
      <section id="brand">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-bold text-xl md:text-2xl ">
            Personal-Blog
          </Link>

          <div>
            <ul className="flex items-center  gap-4">
              <Link
                href="/categories"
                className="hover:scale-105 hover:rotate-180 transition-all duration-300 text-4xl"
              >
                <RiGridFill className="text-orange-500" size={34} />
              </Link>
              {category?.map((cat) => (
                <li key={cat.slug} className="hidden md:block">
                  <Link
                    href={cat.href}
                    className={clsx(
                      "pb-1 transition-colors hover:text-orange-500  relative group",
                      {
                        "border-b-2  border-orange-500 ": pathname === cat.href,
                      }
                    )}
                  >
                    {cat.name}
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-500"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="login" className="hidden md:block">
        <ul className="flex items-center gap-2">
          <li className="border-r-3 pr-2">
            <Link href="sign-up">sign up</Link>
          </li>
          <li>
            <Link href="login">sign in</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
