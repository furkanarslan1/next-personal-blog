"use client";
import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { BiSolidMovie } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function MobileNavbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: <MdHomeFilled /> },
    { href: "/blogs", icon: <FaBloggerB /> },
    { href: "/movies", icon: <BiSolidMovie /> },
    { href: "/books", icon: <FaBookReader /> },
    { href: "/categories", icon: <BiSolidCategory /> },
  ];

  const getIsActive = (href: string) => {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  };
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-fit bg-gradient-to-t from-black to-black/40 h-16 z-30 text-white rounded-xl border border-slate-300  flex items-center justify-center">
      <div className="flex items-center gap-6 text-xl px-4 ">
        {navItems.map((item) => {
          const isActive = getIsActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("p-2 rounded-xl transition-colors", {
                "bg-orange-500 text-white": isActive,
                " text-white": !isActive,
              })}
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
