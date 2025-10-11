"use client";
import Link from "next/link";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { socialLinks } from "@lib/constants/social";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative bg-[url('/personal-blog-hero.jpg')] bg-cover bg-center  h-[400px] md:h-[550px] lg:h-[700px] p-4">
      <div className="absolute right-8 top-1/2 -translate-y-1/2 md:px-12 ">
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
          <div className="" id="hero_social">
            <ul className="flex items-center gap-4 text-sm  md:text-xl text-white">
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="grid grid-cols-3 gap-6 text-white text-sm"
        >
          <div className="border-2 border-orange-500 rounded-md p-4 flex flex-col justify-center items-start gap-2 backdrop-blur-sm bg-black/30 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
            <h5 className="font-bold border-b-2">Experience</h5>
            <p>
              {`This blog was created to share what I've learned and experienced over the years. Here, you'll find not only successes but also mistakes and the lessons I've learned along the way.`}
            </p>
          </div>

          <div className="border-2 border-orange-500 rounded-md p-4 flex flex-col justify-center items-start gap-2 backdrop-blur-sm bg-black/30 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
            <h5 className="font-bold border-b-2">Authentic Journey</h5>
            <p>
              {`Every post is part of a journey blended with personal growth, productivity, and technology. Real stories, honest experiences, and genuine reflections.`}
            </p>
          </div>

          <div className="border-2 border-orange-500 rounded-md p-4 flex flex-col justify-center items-start gap-2 backdrop-blur-sm bg-black/30 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
            <h5 className="font-bold border-b-2">Join the Community</h5>
            <p>
              {`Your thoughts matter! Leave a comment, share an idea, or just say "Hi". This page exists to bring together people who think alike and inspire each other.`}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
