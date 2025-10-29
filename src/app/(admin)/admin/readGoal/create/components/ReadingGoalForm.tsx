"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

interface FormState {
  message: string | null;
  success: boolean;
}

const initialState: FormState = {
  message: null,
  success: false,
};

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
}

function InputField({
  id,
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: InputFieldProps) {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={id} className="font-semibold text-white">
        {label}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        step={type === "number" ? "1" : undefined}
        className="w-full border-2 border-white rounded-md px-3 py-2 bg-gray-900 text-white focus:border-orange-500"
      />
    </div>
  );
}

// Mock SubmitButton
function SubmitButton() {
  const { pending } = useFormStatus();
  //   const pending = false;
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full bg-orange-500 hover:bg-white text-white hover:text-orange-500 cursor-pointer font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Saving..." : "Update/Create Target"}
    </button>
  );
}

interface ReadingGoalFormProps {
  initialGoal: { targetBookCount: number; targetPageCount: number } | null;
  year: number;
  action: (
    prevState: typeof initialState,
    formData: FormData
  ) => Promise<typeof initialState>;
}

export default function ReadingGoalForm({
  initialGoal,
  year,
  action,
}: ReadingGoalFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <div className="bg-black text-white p-4">
      <form
        action={formAction}
        className="flex flex-col gap-6 max-w-xl mx-auto my-6 p-8 bg-gray-900 rounded-xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-4 text-orange-400">
          {year} Reading Goal for the Year
        </h1>
        <p className="text-gray-400">
          You can set or update your annual reading goal with this form.
        </p>
        {/* Hidden Year Field (Required for Server Action) */}
        <input type="hidden" name="year" value={year} />

        {/* Target Number of Books */}
        <InputField
          id="targetBookCount"
          label="Target Number of Books"
          name="targetBookCount"
          type="number"
          required
          defaultValue={initialGoal?.targetBookCount || 50}
        />

        {/* Target Page Count */}
        <InputField
          id="targetPageCount"
          label="Target Number of Pages"
          name="targetPageCount"
          type="number"
          required
          defaultValue={initialGoal?.targetPageCount || 15000}
        />

        {/* Submit */}
        <SubmitButton />

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
