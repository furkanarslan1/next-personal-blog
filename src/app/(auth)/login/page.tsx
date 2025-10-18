"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { FaGoogle } from "react-icons/fa";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 charachters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast.error(res.error || "Invalid credentials");
    } else {
      router.push("/");
      toast.success("login successful!");
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-700 p-8 rounded-xl flex flex-col gap-6 w-[320px]"
      >
        <h1 className="text-center font-bold text-2xl ">Log In</h1>

        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 hover:text-slate-800 hover:scale-105 cursor-pointer transition-all duration-300"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign Up with
          <FaGoogle />
        </Button>
        <p className="text-center text-md">OR</p>

        <input
          type="email"
          placeholder="exmaple@example.com"
          className="outline-none"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="*******"
          className="outline-none"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}
