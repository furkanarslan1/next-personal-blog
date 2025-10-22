import React from "react";
import AdminSidebar from "./components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="p-4 bg-orange-500">
        <AdminSidebar />
      </aside>
      <main className="flex-1 ">{children}</main>
    </div>
  );
}
