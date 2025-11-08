import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }
  return (
    <div className="flex flex-col  h-screen">
      <aside className="p-4 bg-black ">
        <AdminSidebar />
      </aside>
      <main className="flex-1 ">{children}</main>
    </div>
  );
}
