"use client";
import { deleteMovieAction } from "@/actions/movies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteButtonProps {
  id: string;
}
export default function DeleteMovieButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this movie?");
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      const res = await toast.promise(deleteMovieAction(id), {
        loading: "Deleting movie...",
        success: "Movie deleted successfully",
        error: "Failed to delete movie",
      });

      if (res?.success) {
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete blog"
        className="hover:scale-110 transition-all cursor-pointer duration-300 hover:text-orange-500 "
      >
        {isDeleting ? "..." : <FaTrashCan className="text-2xl" />}
      </button>
    </>
  );
}
