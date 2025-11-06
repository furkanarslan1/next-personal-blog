import Image from "next/image";
import React from "react";

interface CommentType {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}
export default function MovieComments({
  comments,
}: {
  comments: CommentType[];
}) {
  if (comments.length === 0) {
    return (
      <p className="text-slate-400 bg-slate-800/40 p-8 rounded-lg  mt-6 text-sm italic">
        No comments yet. Be the first to comment!
      </p>
    );
  }
  return (
    <div className="space-y-4 mt-2 pb-6">
      <h6 className="text-white ps-4">Comments</h6>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-slate-800/40 p-4 rounded-lg flex items-start gap-3"
        >
          <Image
            src={comment.author?.image || "/vercel.svg"}
            alt={comment.author?.name || "user"}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">
              {comment.author?.name || "Anonymous"}
            </p>
            <p className="text-slate-300 text-sm">{comment.content}</p>
            <span className="text-xs text-slate-500">
              {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
