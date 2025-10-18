// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { FaGoogle } from "react-icons/fa";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.error || "Something went wrong");
//       return;
//     }

//     router.push("/login");
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-slate-800 text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-slate-700 p-8 rounded-xl flex flex-col gap-6 w-[320px]"
//       >
//         <h1 className="text-2xl font-bold text-orange-400 text-center">
//           Register
//         </h1>
//         <button
//           onClick={() => signIn("google", { callbackUrl: "/" })}
//           className="flex items-center justify-center cursor-pointer"
//         >
//           <div className="flex items-center gap-4 bg-red-600  hover:bg-red-500 hover:scale-105 transition-all duration-300 px-4 py-2 4 rounded-md">
//             <p> Sign Up with</p>
//             <FaGoogle />
//           </div>
//         </button>
//         <p className="text-center">OR</p>
//         <input
//           type="text"
//           placeholder="Name"
//           className="p-2 rounded text-black"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="p-2 rounded text-black"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="p-2 rounded text-black"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         {error && <p className="text-red-400 text-sm">{error}</p>}

//         <button
//           type="submit"
//           className="bg-orange-500 hover:bg-orange-600 rounded p-2 font-semibold"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid e-mail address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //submit

  async function onSubmit(values: RegisterFormValues) {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }
      toast.success("Register successfully");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800 text-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-slate-700 p-8 rounded-md flex flex-col gap-6 w-[320px]"
        >
          <h1 className="text-center font-bold text-2xl ">Register</h1>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 hover:text-slate-800 hover:scale-105 cursor-pointer transition-all duration-300"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign Up with
            <FaGoogle />
          </Button>
          <p className="text-center text-md">OR</p>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}
