"use client";
import { IoIosThumbsUp } from "react-icons/io";
import { useOptimistic, useTransition } from "react";
import { toggleLikeAction } from "@/actions/like";
import toast from "react-hot-toast";

interface LikeButtonProps {
  type: "post" | "book" | "movie";
  id: string;
  path: string;
  initialLiked: boolean;
  initialLikeCount: number;
  isAuthenticated: boolean;
}

export default function LikeButton({
  type,
  id,
  path,
  initialLiked,
  initialLikeCount,
  isAuthenticated,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  // optimistic UI (anında UI güncelleme)
  const [optimisticState, setOptimisticState] = useOptimistic<
    { liked: boolean; likeCount: number },
    boolean
  >(
    { liked: initialLiked, likeCount: initialLikeCount },
    (state, newLiked) => ({
      liked: newLiked,
      likeCount: newLiked
        ? state.likeCount + 1
        : Math.max(0, state.likeCount - 1),
    })
  );
  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to like");
      return;
    }
    startTransition(() => {
      const newLiked = !optimisticState.liked;
      setOptimisticState(newLiked);
      toggleLikeAction({ type, id, path });
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border transition-all cursor-pointer ${
        optimisticState.liked
          ? "bg-orange-500 border-orange-500 text-white"
          : "border-gray-500 text-gray-300 hover:border-orange-400 hover:text-orange-400"
      } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <IoIosThumbsUp />
      <span>{optimisticState.likeCount}</span>
    </button>
  );
}
