"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutPage() {
  return (
    <div className="bg-slate-800 h-screen text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 p-10 rounded-2xl bg-slate-700 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-orange-400">Logout</h1>

        <button onClick={() => signOut({ callbackUrl: "/" })}>
          Continue with github
        </button>
      </div>
    </div>
  );
}
