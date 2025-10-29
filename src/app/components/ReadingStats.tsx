import { getYearlyReadingStats } from "@/actions/books";
import React from "react";
import { ProgressCircle } from "./ProgressCircle";

export default async function ReadingStats({ year }: { year?: number }) {
  const currentYear = year || new Date().getFullYear();
  const stats = await getYearlyReadingStats(currentYear);

  if (!stats) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl text-white max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Reading Goals ({currentYear})
        </h2>
        <p className="text-center text-gray-400">
          To determine your reading goal, please create a goal.
        </p>
      </div>
    );
  }

  return (
    <div
      className={` bg-[url('/book_progress.jpg')] bg-contain p-6  shadow-2xl text-white mx-auto`}
    >
      <h2 className="text-3xl font-extrabold mb-6 text-slate-800 border-b-2 border-slate-800 pb-2 text-center ">
        Reading Goals and Progress ({currentYear})
      </h2>
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-4 rounded-md">
        {/* İlerleme Çubukları */}
        <div className="flex justify-around items-start mb-16  gap-12">
          <ProgressCircle
            progress={stats.bookProgress}
            label="Book Number Target"
          />
          <ProgressCircle
            progress={stats.pageProgress}
            label="Page Count Target"
          />
        </div>

        {/* Detailed Statistics Table */}
        <div className="mt-6">
          <h3 className="text-sm md:text-xl text-slate-800 font-semibold mb-3 border-b border-gray-600 pb-1">
            Details
          </h3>

          <div className="space-y-2">
            {/* Book Count*/}
            <div className="flex justify-between items-center border-b border-gray-700 py-3 last:border-b-0">
              <span className="font-medium text-sm md:text-xl text-slate-800">
                Book Read:
              </span>
              <span className="text-sm md:text-lg font-bold text-green-400">
                {stats.readBookCount} / {stats.targetBookCount}
              </span>
            </div>

            {/* Page Count*/}
            <div className="flex justify-between items-center border-b border-gray-700 py-3 last:border-b-0">
              <span className="font-medium text-sm md:text-xl text-slate-800">
                Total Pages Read:
              </span>
              <span className="text-sm md:text-lg font-bold text-green-400">
                {stats.readPageCount.toLocaleString()} /
                {stats.targetPageCount.toLocaleString()}
              </span>
            </div>

            {/* Average Book Length */}
            <div className="flex justify-between items-center border-b border-gray-700 py-3 last:border-b-0">
              <span className="font-medium text-sm md:text-xl text-slate-800">
                Average Book Length:
              </span>
              <span className="text-sm md:text-lg font-bold text-orange-400">
                {stats.averageBookLength} Page
              </span>
            </div>
          </div>
        </div>

        {/* Overshoot Note */}
        {(stats.bookProgress > 100 || stats.pageProgress > 100) && (
          <blockquote className="mt-6 border-l-4 border-blue-500 pl-4 italic text-blue-300">
            Congratulations! You have surpassed some of your reading goals.
          </blockquote>
        )}
      </div>
    </div>
  );
}
