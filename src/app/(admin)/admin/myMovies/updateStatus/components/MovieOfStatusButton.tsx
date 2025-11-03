"use client";
import { updateMovieStatusAction } from "@/actions/movies";
import clsx from "clsx";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

type MovieStatus = "WATCHED" | "PLAN_TO_WATCH";

interface StatusButtonProps {
  movieId: string;
  currentStatus: MovieStatus;
}

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-xs px-2 py-1 rounded-md  w-full"
    >
      {pending ? "Updating..." : children}
    </button>
  );
};

export default function MovieOfStatusButton({
  movieId,
  currentStatus,
}: StatusButtonProps) {
  const newStatus: MovieStatus =
    currentStatus === "WATCHED" ? "PLAN_TO_WATCH" : "WATCHED";

  const actionWithArgs = updateMovieStatusAction.bind(null, movieId, newStatus);

  const [state, formAction] = useActionState(actionWithArgs, {
    message: null,
    success: false,
  });

  const buttonClass = clsx(
    "text-white cursor-pointer transition-colors duration-300 p-1 rounded",
    {
      "bg-green-500 hover:bg-green-600": currentStatus === "WATCHED",
      "bg-orange-500 hover:bg-orange-300": currentStatus === "PLAN_TO_WATCH",
    }
  );
  return (
    <div>
      <form action={formAction}>
        <SubmitButton>
          <p className={`${buttonClass} px-4 py-2`}>
            {currentStatus === "WATCHED" ? "Move to Watchlist" : "I Watched"}
          </p>
        </SubmitButton>
      </form>
      {state.message && (
        <p
          className={`mt-1 text-center text-xs ${
            state.success ? "text-green-800" : "text-red-800"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
