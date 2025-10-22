"use client";
import { deleteBlogAction } from "@/actions/blogs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteButtonProps {
  id: string;
}
export default function DeleteBlogButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      const res = await toast.promise(deleteBlogAction(id), {
        loading: "Deleting blog...",
        success: "Blog deleted successfully",
        error: "Failed to delete blog",
      });

      if (res?.success) {
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
    setIsDeleting(false);
  };
  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete blog"
        className="hover:scale-110 transition-all cursor-pointer duration-300 hover:text-orange-500"
      >
        {isDeleting ? "..." : <FaTrashCan />}
      </button>
    </>
  );
}
