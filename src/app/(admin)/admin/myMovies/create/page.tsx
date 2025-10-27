"use client";

import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { addMovieAction } from "@/actions/movies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { movieCategories } from "@lib/constants/movieCategories";

const initialState = {
  message: null,
  success: false,
};

export default function CreateMovie() {
  const [state, formAction] = useActionState(addMovieAction, initialState);

  //Poster ve Background Images
  const [posterUrl, setPosterUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");

  // Upload situation
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);
  const [isUploadingBack, setIsUploadingBack] = useState(false);

  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_FOLDER = "personal-blog";

  // ************ POSTER UPLOAD ************
  const handlePosterUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      alert("Please check Cloudinary environment variables!");
      return;
    }

    setIsUploadingPoster(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", CLOUDINARY_FOLDER);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Cloudinary upload failed");
      const data = await response.json();
      setPosterUrl(data.secure_url);
    } catch (error) {
      console.error("Poster upload error:", error);
      alert("Poster upload failed. Check console.");
      setPosterUrl("");
    } finally {
      setIsUploadingPoster(false);
    }
  };

  // ************ BACKGROUND UPLOAD ************
  const handleBackgroundUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      alert("Please check Cloudinary environment variables!");
      return;
    }

    setIsUploadingBack(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", CLOUDINARY_FOLDER);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Cloudinary upload failed");
      const data = await response.json();
      setBackgroundUrl(data.secure_url);
    } catch (error) {
      console.error("Background upload error:", error);
      alert("Background upload failed. Check console.");
      setBackgroundUrl("");
    } finally {
      setIsUploadingBack(false);
    }
  };

  return (
    <div className="bg-black text-white   p-4">
      <form
        action={formAction}
        className="flex flex-col gap-6 max-w-xl mx-auto my-6"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Movie</h1>

        {/* Title */}
        <InputField id="title" label="Title" name="title" required />

        {/* Description */}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="description" className="font-semibold">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows={8}
            required
            className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 text-white focus:border-orange-500"
          />
        </div>

        {/* Poster Upload */}
        <ImageUploadField
          label="Poster Image"
          onChange={handlePosterUpload}
          isUploading={isUploadingPoster}
          imageUrl={posterUrl}
          name="posterUrl"
        />

        {/* Background Upload */}
        <ImageUploadField
          label="Background Image"
          onChange={handleBackgroundUpload}
          isUploading={isUploadingBack}
          imageUrl={backgroundUrl}
          name="backgroundUrl"
        />

        {/* Trailer URL */}
        <InputField id="trailerUrl" label="Trailer URL" name="trailerUrl" />

        {/* Release Year */}
        <InputField
          id="releaseYear"
          label="Release Year"
          name="releaseYear"
          type="number"
        />

        {/* Rating */}
        <InputField
          id="rating"
          label="Rating (1-10)"
          name="rating"
          type="number"
          step="0.1"
        />

        {/* Genres */}
        {/* <InputField
          id="genres"
          label="Genres (comma separated)"
          name="genres"
          placeholder="Action, Drama, Sci-Fi"
        /> */}

        <SelectMultiple
          id="genres"
          name="genres"
          options={movieCategories}
          placeholder="Select genres"
        />

        {/* Status */}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="status" className="font-semibold">
            Status:
          </label>
          <Select name="status" defaultValue="PLAN_TO_WATCH">
            <SelectTrigger className="w-full bg-gray-900 border-2 border-white text-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WATCHED">Watched</SelectItem>
              <SelectItem value="PLAN_TO_WATCH">Plan to Watch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <SubmitButton isUploading={isUploadingPoster || isUploadingBack} />

        {/* Result */}
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

// Reusable Input Field
function InputField({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  step,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  step?: string | number;
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={id} className="font-semibold">
        {label}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        step={step}
        className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 text-white focus:border-orange-500"
      />
    </div>
  );
}

// Image Upload Field
function ImageUploadField({
  label,
  onChange,
  isUploading,
  imageUrl,
  name,
}: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  imageUrl: string;
  name: string;
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      <label className="font-semibold">{label}:</label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 text-white focus:border-blue-400"
      />

      <input type="hidden" name={name} value={imageUrl} />

      {isUploading ? (
        <div className="mt-2 text-sm text-yellow-400">Uploading...</div>
      ) : imageUrl ? (
        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm text-green-400">Upload successful!</span>
          <img
            src={imageUrl}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-md border border-gray-700"
          />
        </div>
      ) : null}
    </div>
  );
}

//Submit Button
function SubmitButton({ isUploading }: { isUploading: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || isUploading}
      className="mt-6 w-full bg-orange-500 hover:bg-white text-white hover:text-orange-500 cursor-pointer font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Adding..." : "Add Movie"}
    </button>
  );
}

// ************************* GENRE*****************************************************************************
function SelectMultiple({
  id,
  name,
  options,
  placeholder,
}: {
  id: string;
  name: string;
  options: string[];
  placeholder?: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-semibold">
        {placeholder}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() =>
              setSelected((prev) =>
                prev.includes(option)
                  ? prev.filter((o) => o !== option)
                  : [...prev, option]
              )
            }
            className={`px-3 py-1 rounded-md border hover:bg-orange-500 cursor-pointer ${
              selected.includes(option)
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-900 text-white border-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={JSON.stringify(selected)} />
    </div>
  );
}
