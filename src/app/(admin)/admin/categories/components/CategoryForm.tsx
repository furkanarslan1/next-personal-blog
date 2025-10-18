"use client";
import { addCategoryAction } from "@/actions/categories";

import React, { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

//form add button situation
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-1 w-full rounded-md transition-all duration-500 cursor-pointer ${
        pending
          ? "bg-gray-500 text-gray-300"
          : "bg-orange-500 hover:bg-white hover:text-orange-500"
      }`}
    >
      {" "}
      {pending ? "Adding..." : "Add"}
    </button>
  );
};

//The form itself
const initialState = {
  message: null,
  success: false,
};

export default function CategoryForm() {
  const [state, formAction] = useActionState(addCategoryAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // if successful clear the input
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      toast.success(state.message || "Category added successfully!");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  //set message color
  // const messageColor = state.success ? "text-green-400" : "text-red-400";

  return (
    <div className="flex flex-col gap-4 items-center p-4 border-2 rounded-md w-full max-w-sm border-orange-500">
      <h2 className="border-b-2">Add Category</h2>
      <form
        action={formAction}
        ref={formRef}
        className="flex flex-col gap-4 items-center w-full text-white"
      >
        <input
          type="text"
          placeholder="add a category"
          maxLength={20}
          name="categoryName"
          required
          className="placeholder-gray-500 border-2 border-slate-500 rounded-md px-2 py-1 outline-none w-full placeholder:py-2 text-white"
        />
        <SubmitButton />
      </form>
      {/* {state.message && (
        // <p className={`${messageColor} mt-2 text-center`}>{state.message}</p>
        <p className="mt-2 text-center"> {state.message}</p>
      )} */}
    </div>
  );
}
