"use client";
import React from "react";

import Link from "next/link";
import { RiGridFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { TiArrowSortedDown } from "react-icons/ti";
import clsx from "clsx";

interface CategoriesType {
  slug: string;
  name: string;
}

interface HeaderProps {
  session: Session | null;
  categories: CategoriesType[];
}

export default function Header({ session, categories }: HeaderProps) {
  const pathname = usePathname();
  console.log("Header'a gelen kategoriler:", categories);
  return (
    <nav className="flex items-center justify-between md:justify-around gap-4 px-6 h-16 bg-transparent text-white border-b-1 border-slate-400 ">
      <section id="brand">
        <div className="flex items-center gap-4 md:gap-12">
          <Link
            href="/"
            className="font-bold text-transparent bg-gradient-to-r bg-clip-text from-orange-500  to-slate-300 text-xl md:text-2xl "
          >
            Personal Blog
          </Link>

          <div className="relative group">
            <div className="flex flex-col items-center  gap-4">
              <Link href="/categories" className="flex items-center gap-2   ">
                <RiGridFill className="text-orange-500 text-4xl" size={34} />
                <div className="md:flex items-center gap-2 hidden">
                  <p>Categories</p>
                  <span>
                    <TiArrowSortedDown />
                  </span>
                </div>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block transition-all duration-300 z-50 ">
                <ul className="flex items-center gap-3 w-[400px] flex-wrap p-4 rounded-md  bg-transparent  backdrop-blur-lg ">
                  {categories?.map((cat) => (
                    <li key={cat.slug} className="hidden md:block  group">
                      <Link
                        href={`/blogs?category=${cat.slug} `}
                        className={
                          "pb-1 transition-colors hover:text-orange-500  relative "
                        }
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ul className="md:flex items-center gap-4 hidden  ">
            <li>
              <Link
                href="/blogs"
                // className="hover:text-orange-500 transition-colors duration-300"
                className={clsx(
                  "hover:text-orange-500 transition-colors duration-300",
                  {
                    "border-b-2 border-orange-500 text-orange-500":
                      pathname === "/blogs",
                  }
                )}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/movies"
                className={clsx(
                  "hover:text-orange-500 transition-colors duration-300",
                  {
                    "border-b-2 border-orange-500 text-orange-500":
                      pathname === "/movies",
                  }
                )}
              >
                Movies
              </Link>
            </li>

            <li>
              <Link
                href="/books"
                className={clsx(
                  "hover:text-orange-500 transition-colors duration-300",
                  {
                    "border-b-2 border-orange-500 text-orange-500":
                      pathname === "/books",
                  }
                )}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={clsx(
                  "hover:text-orange-500 transition-colors duration-300",
                  {
                    "border-b-2 border-orange-500 text-orange-500":
                      pathname === "/about",
                  }
                )}
              >
                Who am I
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section id="login" className="hidden md:block">
        <ul className="flex items-center gap-2">
          {session?.user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="hover:text-orange-500 transition-colors duration-300 bg-orange-500 rounded-md px-4 py-2"
            >
              Admin Panel
            </Link>
          )}
          {session ? (
            <div className="flex items-center gap-4">
              {/* <Link
                href={`/account/${session.user?.id}`}
                className="bg-white/10 px-4 py-3 rounded-md text-sm"
              >
                {session?.user?.name
                  ? session.user.name.length > 10
                    ? session.user.name.slice(0, 10) + "..."
                    : session.user.name
                  : "User"}
              </Link> */}
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-orange-500 rounded-md hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                Sing Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <li className=" px-4 py-2 rounded-md bg-white/20  hover:bg-white hover:text-orange-500 transition-all duration-300 cursor-pointer">
                <Link href="/register">sign up</Link>
              </li>
              <li className="px-4 py-2 bg-orange-500 rounded-md hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <Link href="/login">sign in</Link>
              </li>
            </div>
          )}
        </ul>
      </section>
    </nav>
  );
}
