import Image from "next/image";
import React from "react";
import HomeBanner from "../(home)/components/HomeBanner";

export default function About() {
  return (
    <div className="h-min-screen">
      <div className="relative bg-[url('/who_bg.jpg')] bg-cover bg-center  h-[400px] md:h-[550px] lg:h-[700px] p-4">
        <span className="absolute inset-0 h-full w-full bg-gradient-to-t from-transparent to-black/80"></span>
        <h1 className="text-center font-bold text-slate-300 text-xl md:text-4xl pt-16 relative ">
          Welcome My Personal Web Site
        </h1>

        <div className="text-white  text-4xl absolute top-1/2 -translate-y-1/2">
          <h4 className="text-orange-500 font-extrabold text-2xl md:text-4xl">
            Hi! I&apos;m Marry
          </h4>
          <p className="text-slate-300 font-bold text-sm md:text-2xl mt-4">
            Are you ready to start getting to know me?
          </p>
        </div>
      </div>
      <div className="p-4 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 mt-6 ">
          <div className="relative md:h-96 h-56 w-full md:w-full ">
            <Image
              src="/who_bg_3.jpg"
              alt="who_i_am_page_bg_2"
              className="object-cover object-center rounded-2xl "
              fill
            />
          </div>
          <div className="space-y-2">
            <h5 className="text-2xl md:text-4xl font-bold text-slate-800">
              Hiking is my favorite thing to do.
            </h5>
            <p className=" p-4 text-md md:text-2xl ">
              Whenever I go hiking, I feel completely connected to nature.
              It&apos;s a way to reset, reflect, and find balance in life. Every
              step on the trail reminds me to stay curious and keep exploring —
              both in nature and in life.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 mt-6 ">
          <div className="space-y-2 order-2 md:order-1">
            <h5 className="text-2xl md:text-4xl font-bold text-slate-800">
              Capturing the Beauty of Nature
            </h5>
            <p className="p-4 text-md md:text-2xl ">
              Taking photos while exploring nature allows me to freeze moments
              that words can&apos;t describe. Every picture tells a story — the
              sound of the wind, the warmth of the sun, or the calm after a
              rain. Photography helps me see the world more deeply and
              appreciate the beauty in every small detail.
            </p>
          </div>
          <div className="relative md:h-96 h-56 w-full order-1 md:order-2">
            <Image
              src="/who_bg_2.jpg"
              alt="who_i_am_page_bg_2"
              className="object-cover object-center rounded-2xl"
              fill
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start items-center gap-4 mt-6 ">
          <div className="relative md:h-96 h-56 w-full rounded-full">
            <Image
              src="/who_bg_5.jpg"
              alt="who_i_am_page_bg_4"
              className="object-cover object-top rounded-2xl"
              fill
            />
          </div>
          <div className="space-y-2">
            <h5 className="text-2xl md:text-4xl font-bold text-slate-800">
              Minimalism Inspires Me
            </h5>
            <p className="p-4 text-md md:text-2xl ">
              I believe that true beauty lies in simplicity. Whether it&apos;s
              in design, photography, or everyday life, minimalism helps me
              focus on what truly matters. Removing the unnecessary creates
              space for clarity, peace, and purpose — and that’s where
              creativity truly begins.
            </p>
          </div>
        </div>
        <div>
          <HomeBanner />
        </div>
      </div>
    </div>
  );
}
