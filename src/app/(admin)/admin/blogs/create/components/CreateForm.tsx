"use client";

import React, { useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { addBlogAction } from "@/actions/blogs";
import type { Category } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState = {
  message: null,
  success: false,
};

export default function CreateForm({ categories }: { categories: Category[] }) {
  const [state, formAction] = useActionState(addBlogAction, initialState);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_FOLDER = "personal-blog";

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      alert("Please check env and Cloudinary structure");
      return;
    }
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", CLOUDINARY_FOLDER);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload error.");
      }

      const data = await response.json();

      //if url succces save the state
      setUploadedImageUrl(data.secure_url);
    } catch (error) {
      console.error("An error occured while uploading:", error);
      alert("Image didn't upload. Please check console.");
      setUploadedImageUrl(""); // if there is a error, clear the url
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="bg-black text-white h-screen overflow-y-auto p-4">
      <form
        action={formAction}
        className="flex flex-col gap-6 max-w-xl mx-auto my-6"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>

        {/*Title area */}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="title" className="font-semibold">
            Title:
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-orange-500"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="content" className="font-semibold">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            required
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-orange-500"
          />
        </div>

        {/* Excerpt*/}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="excerpt" className="font-semibold">
            Excerpt:
          </label>
          <input
            id="excerpt"
            name="excerpt"
            type="text"
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-orange-500"
          />
        </div>

        {/* Image*/}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="imageUpload" className="font-semibold">
            Image Upload:
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-blue-400"
          />

          <input type="hidden" name="imageUrl" value={uploadedImageUrl} />

          {/* Upload preview */}
          {isUploading ? (
            <div className="mt-2 text-sm text-yellow-400">Uploading...</div>
          ) : uploadedImageUrl ? (
            <div className="mt-2 flex items-center gap-3">
              <span className="text-sm text-green-400">
                Image successfully uploaded!
              </span>
              {/* preview active */}

              <img
                src={uploadedImageUrl}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md border border-gray-700"
              />
            </div>
          ) : null}
        </div>

        {/* Category*/}
        {/* <div className="flex flex-col items-start gap-1">
          <label htmlFor="categoryId" className="font-semibold">
            Category ID:
          </label>
          <input
            id="categoryId"
            name="categoryId"
            type="text"
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-orange-500"
          />
        </div> */}

        <Select
          value={selectedCategoryId}
          onValueChange={setSelectedCategoryId}
        >
          <SelectTrigger className="w-[180px]  bg-black border-2 border-orange-500 font-bold">
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent className="">
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id} className="">
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="categoryId" value={selectedCategoryId} />

        {/*Tags Area */}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="tags" className="font-semibold">
            Tags (Split with ,):
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-orange-500"
          />
        </div>

        {/* Keywords Area */}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="keywords" className="font-semibold">
            Keywords:
          </label>
          <input
            id="keywords"
            name="keywords"
            type="text"
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-orange-500"
          />
        </div>

        {/* Meta Description*/}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="metaDescription" className="font-semibold">
            Metadescription:
          </label>
          <input
            id="metaDescription"
            name="metaDescription"
            type="text"
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 outline-none text-white focus:border-orange-500"
          />
        </div>

        {/* Publish(Checkbox) */}
        <div className="flex items-center gap-3 mt-2">
          <input
            id="isPublished"
            name="isPublished"
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isPublished" className="font-semibold select-none">
            Publish Now
          </label>
        </div>

        {/* Send Button */}
        <SubmitButton isUploading={isUploading} />

        {/* result mesage */}
        {state.message && (
          <p
            aria-live="polite"
            className={`mt-4 p-3 rounded-lg font-semibold ${
              state.success
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}

// Buton : Form sitiuation
function SubmitButton({ isUploading }: { isUploading: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || isUploading}
      className="mt-6 w-full bg-white hover:bg-orange-500 text-black hover:text-white cursor-pointer font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Adding..." : "Blog Add"}
    </button>
  );
}
