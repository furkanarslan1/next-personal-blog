// app/(main)/layout.tsx
import { auth } from "@/auth";
import Header from "../components/header/Header";
import React from "react";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-30">
        <Header session={session} />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
