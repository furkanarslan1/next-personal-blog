import React from "react";

import { FaEdit } from "react-icons/fa";

import { prisma } from "@lib/prisma";
import { Category } from "@/generated/prisma";
import CategoryForm from "./components/CategoryForm";
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";

async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className=" bg-slate-800 text-white p-4 min-h-full text-sm">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-center border-b-4 border-orange-500 text-2xl font-bold pb-2 mb-12">
          Categories
        </h1>
        <CategoryForm />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat.slug}
                className="relative flex flex-col items-center gap-6 border-2 border-orange-500 rounded-md bg-slate-800 text-white p-6 "
              >
                <p>{cat.name}</p>
                <div className="flex items-center justify-between w-full ">
                  <EditButton name={cat.name} slug={cat.slug} />

                  <DeleteButton slug={cat.slug} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-md md:text-xl text-gray-400 col-span-full">
              There is no category yet. Please add a category
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
