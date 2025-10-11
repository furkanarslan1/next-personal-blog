"use client";
import Link from "next/link";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { socialLinks } from "@lib/constants/social";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="bg-[url('/personal-blog-hero.jpg')] bg-cover bg-center  h-[400px] md:h-[550px] lg:h-[700px] p-4">
      <div className="flex flex-col  items-end justify-center md:px-12  w-full h-full">
        <div className="flex flex-col gap-4  text-2xl md:text-6xl ">
          <Link
            href="/contact"
            className="border-4 border-orange-500 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl w-fit p-4 hover:bg-orange-500  transition-all duration-400"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }} // başlangıç konumu
              animate={{ opacity: 1, x: 0 }} // hedef konum
              transition={{ duration: 0.8, ease: "easeOut" }} // geçiş ayarları
              className="flex items-center gap-6"
            >
              <h3 className=" text-white">Contact Me</h3>
              <FaArrowCircleRight className="text-white text-md" />
            </motion.div>
          </Link>
          <Link
            href="/about"
            className="border-4 border-orange-500 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl w-fit p-4 hover:bg-orange-500  transition-all duration-400"
          >
            <h3 className=" text-white">About</h3>
          </Link>
          <div className="mt-12">
            <ul className="flex items-center gap-4  md:text-2xl text-white">
              {socialLinks?.map((s) => (
                <li
                  key={s.name}
                  className="hover:scale-110 hover:text-orange-500 transition-all duration-300 "
                >
                  <Link href={s.href}>{s.icon}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
