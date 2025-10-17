import SignIn from "@/app/components/sign-in";
import SignInCredentials from "@/app/components/signin-credentials";
import React from "react";

export default function () {
  return (
    <div className="bg-slate-800 h-screen text-white">
      <div className=" max-w-4xl mx-auto pt-16  h-full ">
        <section className="flex flex-col items-center justify-center  gap-6 h-full w-ull">
          <div>
            <SignIn />
          </div>
          <p>OR</p>
          <div>
            <SignInCredentials />
          </div>
        </section>
      </div>
    </div>
  );
}
