"use client";
import React from "react";

import { category } from "../../../../lib/constants/navigation";
import Link from "next/link";
import { RiGridFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-around gap-4 px-6 h-16 bg-transparent text-white border-b-1 border-slate-400">
      <section id="brand">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="font-bold text-transparent bg-gradient-to-r bg-clip-text from-orange-500  to-slate-300 text-xl md:text-2xl "
          >
            Personal Blog
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
          {session ? (
            <div className="flex items-center gap-4">
              <Link
                href={`/account/${session.user?.id}`}
                className="bg-white/10 px-4 py-3 rounded-md text-sm"
              >
                {/* {session.user.name.length > 10
                  ? session.user.name.slice(0, 10) + "..."
                  : session.user.name} */}
                {session?.user?.name
                  ? session.user.name.length > 10
                    ? session.user.name.slice(0, 10) + "..."
                    : session.user.name
                  : "User"}
              </Link>
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
