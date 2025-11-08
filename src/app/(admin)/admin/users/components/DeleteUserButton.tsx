"use client";

import { deleteUserAction } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

interface DeleteUserProps {
  id: string;
}

export default function DeleteUserButton({ id }: DeleteUserProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      const res = await toast.promise(deleteUserAction(id), {
        loading: "Deleting user...",
        success: "User deleted successfully",
        error: "Failed to delete user",
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
        className="hover:scale-110 transition-all cursor-pointer duration-300 text-white hover:text-orange-500 "
      >
        {isDeleting ? "..." : <FaTrashCan className="text-2xl" />}
      </button>
    </>
  );
}
