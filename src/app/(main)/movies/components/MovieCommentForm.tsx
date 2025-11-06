"use client";
import { addMovieComment } from "@/actions/comments";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

export default function MovieCommentForm({
  movieId,
  isAuthenticated,
}: {
  movieId: string;
  isAuthenticated: boolean;
}) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (content.trim()) {
      startTransition(async () => {
        const res = await addMovieComment(movieId, content.trim());
        setMessage(res.message);
        if (res.success) {
          setContent("");
          router.refresh();
        }
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border text-slate-300 border-slate-300 rounded-lg p-2 focus:outline-none focus:border-2 focus:border-orange-500 min-h-[80px] placeholder:text-slate-300"
        />
        <p className="text-slate-100 bg-orange-500 w-fit px-4 py-2 rounded-md text-sm mt-2 ">
          Please
          <Link
            href="/login"
            className="text-white underline font-extrabold px-1"
          >
            <span className="  rounded-md py-1 "> log in</span>
          </Link>
          to leave a comment.
        </p>
      </div>
    );
  }
  return (
    <div>
      <h5 className="text-slate-300 mt-6">Please leave a comment</h5>

      <form onSubmit={handleSubmit} className="mt-2 space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border text-slate-300 border-slate-300 rounded-lg p-2 focus:outline-none focus:border-2 focus:border-orange-500 min-h-[80px] placeholder:text-slate-300"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-orange-500 w-full md:w-fit cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Post Comment"}
        </button>
        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
