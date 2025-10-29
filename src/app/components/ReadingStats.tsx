import { getYearlyReadingStats } from "@/actions/books";
import React from "react";
import { ProgressCircle } from "./ProgressCircle";

export default async function ReadingStats({ year }: { year?: number }) {
  const currentYear = year || new Date().getFullYear();
  const stats = await getYearlyReadingStats(currentYear);

  // card structure for still
  const cardStyle = "bg-gray-800 p-6 rounded-xl shadow-2xl text-white";
  const statItemStyle =
    "flex justify-between items-center border-b border-gray-700 py-3 last:border-b-0";
  if (!stats) {
    return (
      <div className={`${cardStyle} max-w-lg mx-auto`}>
        <h2 className="text-2xl font-bold mb-4 text-orange-400">
          Reading Goals ({currentYear})
        </h2>
        <p className="text-center text-gray-400">
          To determine your reading goal, please create a goal.
        </p>
      </div>
    );
  }

  return (
    <div className={`${cardStyle} max-w-3xl mx-auto`}>
      <h2 className="text-3xl font-extrabold mb-6 text-orange-400 border-b border-orange-500 pb-2">
        Okuma Hedefleri ve İlerleme ({currentYear})
      </h2>

      {/* İlerleme Çubukları */}
      <div className="flex justify-around items-start mb-8 flex-wrap gap-8">
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
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-600 pb-1">
          Details
        </h3>

        <div className="space-y-2">
          {/* Book Count*/}
          <div className={statItemStyle}>
            <span className="font-medium">Book Read:</span>
            <span className="text-lg font-bold text-green-400">
              {stats.readBookCount} / {stats.targetBookCount}
            </span>
          </div>

          {/* Page Count*/}
          <div className={statItemStyle}>
            <span className="font-medium">Total Pages Read:</span>
            <span className="text-lg font-bold text-green-400">
              {stats.readPageCount.toLocaleString()} /{" "}
              {stats.targetPageCount.toLocaleString()}
            </span>
          </div>

          {/* Average Book Length */}
          <div className={statItemStyle}>
            <span className="font-medium">Average Book Length:</span>
            <span className="text-lg font-bold text-orange-400">
              {stats.averageBookLength} Sayfa
            </span>
          </div>
        </div>
      </div>

      {/* Overshoot Note */}
      {(stats.bookProgress > 100 || stats.pageProgress > 100) && (
        <blockquote className="mt-6 border-l-4 border-blue-500 pl-4 italic text-blue-300">
          Congratulations! You've surpassed some of your reading goals.
        </blockquote>
      )}
    </div>
  );
}
