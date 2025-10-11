"use client";
import React from "react";

import { category } from "../../../../lib/constants/navigation";
import Link from "next/link";
import { Grip } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-around gap-4 px-6 h-16 bg-slate-800 text-white">
      <section id="brand">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-bold text-2xl">
            Personal-Blog
          </Link>

          <div>
            <ul className="flex items-center  gap-4">
              <Link
                href="/categories"
                className="hover:scale-105 hover:rotate-180 transition-all duration-300 "
              >
                <Grip />
              </Link>
              {category?.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={cat.href}
                    className={clsx(
                      "pb-1 transition-colors hover:text-blue-400  relative group",
                      {
                        "border-b-2 border-current": pathname === cat.href,
                      }
                    )}
                  >
                    {cat.name}
                    <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-400 group-hover:w-full group-hover:left-0 transition-all duration-500"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="about_navbar">
        <ul className="flex items-center gap-2">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </section>

      <section id="login">
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
