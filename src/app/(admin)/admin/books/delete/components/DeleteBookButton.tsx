"use client";
import { deleteBookAction } from "@/actions/books";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteButtonProps {
  id: string;
}
export default function DeleteBookButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      const res = await toast.promise(deleteBookAction(id), {
        loading: "Deleting book...",
        success: "Book deleted successfully",
        error: "Failed to delete book",
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
