"use client";
import { updateCategoryAction } from "@/actions/categories";
import React, { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

interface EditButtonProps {
  slug: string;
  name: string;
}

interface FormState {
  message: string | null;
  success: boolean;
}

const initialState: FormState = {
  message: null,
  success: false,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-500 px-2 text-sm py-1 rounded-md hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-500 cursor-pointer"
    >
      {pending ? "Updating..." : "Save"}
    </button>
  );
};

export default function EditButton({ name, slug }: EditButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useActionState(
    updateCategoryAction,
    initialState
  );

  //listen server and send a tosat message
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        setIsEditing(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="hover:scale-125 transition-all cursor-pointer duration-300 hover:text-orange-500"
        title="Edit Category"
      >
        <FaEdit />
      </button>

      {/* basic modal */}

      {isEditing && (
        <div className="absolute inset-0 bg-slate-900/90 border-2 border-orange-500 flex flex-col justify-center items-center  p-4 text-sm h-full w-full">
          <form
            action={formAction}
            className="p-6 bg-slate-700 border-2 border-orange-500 rounded-md shadow-md flex flex-col gap-4 w-full max-w-xs"
          >
            <h3 className=" md:text-xl font-bold border-b pb-2">
              Edit: {name}
            </h3>

            {/* Orijinal slug'ı gizli input ile sunucu eylemine gönderiyoruz */}
            <input type="hidden" name="slug" defaultValue={slug} />

            <label className="flex flex-col gap-1">
              New Name:
              <input
                type="text"
                name="newName"
                defaultValue={name}
                required
                placeholder="New category name"
                maxLength={20}
                className="px-3 py-2 rounded text-white border border-slate-500 outline-none focus:border-2 focus:border-orange-500 text-sm"
              />
            </label>

            <div className="flex flex-col md:flex-row justify-between mt-2 gap-4">
              <SubmitButton />
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-white text-orange-500 text-sm px-2 py-1 rounded-md hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
