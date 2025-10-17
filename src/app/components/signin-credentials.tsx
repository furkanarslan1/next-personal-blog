"use client";

import { useFormStatus } from "react-dom";
import { signIn } from "../(auth)/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-orange-500 rounded-md py-2 font-bold cursor-pointer hover:bg-orange-600 hover:scale-105 transition-all duration-300"
    >
      {pending ? "Logging In..." : "Log in"}
    </button>
  );
}

export default function SignInCredentials() {
  const handleSubmit = async (formData: FormData) => {
    // signIn automatically captures form data.
    await signIn("credentials", formData);
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-6  ">
      <h2 className="text-center border-b-2 border-orange-500 pb-1">
        Log in with e-mail and password
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 border-2 p-2 rounded-md border-orange-500">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="placeholder:text-slate-400 px-2 outline-none"
            placeholder="Pleae enter your e-mail"
          />
        </div>
        <div className="flex items-center gap-2  border-2 p-2 rounded-md border-orange-500">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="placeholder:text-slate-400 px-2 outline-none"
            placeholder="password"
          />
        </div>
      </div>

      {/* signIn automatically passes the email and password in formData to the authorize function */}
      <SubmitButton />
    </form>
  );
}
