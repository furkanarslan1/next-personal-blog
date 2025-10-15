"use client";
import { deleteCategoryAction } from "@/actions/categories";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteButtonProps {
  slug: string;
}
export default function DeleteButton({ slug }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = "Are you sure you want to delete this category?";
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      await toast.promise(deleteCategoryAction(slug), {
        loading: "Deleting category...",
        success: "Category deleted successfully!",
        error: "Failed to delete category.",
      });
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
        title="Delete"
        className="hover:scale-110 transition-all cursor-pointer duration-300 hover:text-orange-500"
      >
        {isDeleting ? "..." : <FaTrashCan />}
      </button>
    </>
  );
}
