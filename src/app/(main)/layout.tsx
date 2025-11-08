// app/(main)/layout.tsx
import { auth } from "@/auth";
import Header from "../components/header/Header";
import React from "react";
import { prisma } from "@lib/prisma";
import MobileNavbar from "../components/MobileNavbar";
import Footer from "../components/Footer";

interface CategoriesType {
  slug: string;
  name: string;
}

async function getCategories(): Promise<CategoriesType[]> {
  const res = await prisma.category.findMany({
    select: {
      slug: true,
      name: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return res;
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const categories = await getCategories();
  return (
    <>
      <header className="absolute top-0 left-0 w-full z-30">
        <Header session={session} categories={categories} />
      </header>
      <main className="">{children}</main>
      <footer>
        <Footer categories={categories} />
      </footer>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </>
  );
}
