"use client";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface ProgressCircleProps {
  progress: number;
  label: string;
}

const getColor = (progress: number): string => {
  if (progress >= 100) return "#3b82f6"; // Blue (exceeded)
  if (progress >= 90) return "#10b981"; // Green (Completing)
  if (progress >= 50) return "#f59e0b"; // Yellow (Average)
  return "#ef4444"; // Red (start)
};

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  label,
}) => {
  // Even if Progress is greater than 100, take it as 100
  const normalizedProgress = Math.min(progress, 100);
  const color = getColor(progress);

  //Text content (private message if exceeding 100)
  const textContent =
    progress > 100
      ? `+${(progress - 100).toFixed(0)}%`
      : `${normalizedProgress.toFixed(0)}%`;

  return (
    <div className="flex flex-col items-center text-center w-36 h-36">
      <div className="w-full h-full">
        <CircularProgressbar
          value={normalizedProgress}
          text={textContent}
          styles={buildStyles({
            // Path color (progress bar)
            pathColor: color,
            // Trail color (background bar)
            trailColor: "#4b5563",
            // Metin rengi
            textColor: color,
            // Base value (start from 0)
            pathTransitionDuration: 0.5,
          })}
        />
      </div>

      <p className="mt-4 font-medium text-lg text-white">{label}</p>

      {/* Overshoot Text */}
      {progress > 100 && (
        <span className="text-sm font-semibold text-blue-400 mt-1">
          Target Exceeded!
        </span>
      )}
    </div>
  );
};
