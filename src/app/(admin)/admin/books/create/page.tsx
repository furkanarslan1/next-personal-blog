"use client";
import { addBookAction } from "@/actions/books";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookCategories } from "@lib/constants/bookCategories";
import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: null,
  success: false,
};

export default function BookCreatePage() {
  const [state, formAction] = useActionState(addBookAction, initialState);

  const [coverImageUrl, setCoverImageUrl] = useState("");

  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_FOLDER = "personal-blog";

  //  **************** COVER IMAGE UPLOAD ******************

  const handleCoverImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      alert("Please check Cloudinary environment variables!");
      return;
    }

    setIsUploadingCover(true);
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
      setCoverImageUrl(data.secure_url);
    } catch (error) {
      console.error("Cover Image upload error:", error);
      alert("Cover Image upload failed. Check console.");
      setCoverImageUrl("");
    } finally {
      setIsUploadingCover(false);
    }
  };

  return (
    <div className="bg-black text-white p-4">
      <form
        action={formAction}
        className="flex flex-col gap-6 max-w-xl mx-auto my-6"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
        {/* TİTLE */}
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

        {/* Cover Image Upload */}
        <ImageUploadField
          label="Cover Image"
          onChange={handleCoverImageUpload}
          isUploading={isUploadingCover}
          imageUrl={coverImageUrl}
          name="coverImageUrl"
        />

        {/* AUTHOR NAME */}
        <InputField
          id="authorName"
          label="Author Name"
          name="authorName"
          required
        />

        {/* Publisher */}
        <InputField
          id="publisher"
          label="Publisher"
          name="publisher"
          required
        />
        {/* PUBLİSH Year */}
        <InputField
          id="publishYear"
          label="Publish Year"
          name="publishYear"
          type="number"
        />

        {/* Page Count */}
        <InputField
          id="pageCount"
          label="Page Count"
          name="pageCount"
          type="number"
        />

        {/*My Rating */}
        <InputField
          id="myRating"
          label="My Rating (1-10)"
          name="myRating"
          type="number"
          step="0.1"
        />
        <InputField
          id="finishedYear" //
          label="Finished Year (Optional - for READ status)"
          name="finishedYear"
          type="number" //
          placeholder={new Date().getFullYear().toString()}
          required={false}
        />

        {/* GENRE */}
        <SelectMultiple
          id="genres"
          name="genres"
          options={bookCategories}
          placeholder="Select genres"
        />

        {/* Status */}
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="status" className="font-semibold">
            Status:
          </label>
          <Select name="status" defaultValue="PLAN_TO_READ">
            <SelectTrigger className="w-full bg-gray-900 border-2 border-white text-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="READING">READING</SelectItem>
              <SelectItem value="READ">READ</SelectItem>
              <SelectItem value="PLAN_TO_READ">PLAN_TO_READ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <SubmitButton isUploading={isUploadingCover} />

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
      {pending ? "Adding..." : "Add Book"}
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
