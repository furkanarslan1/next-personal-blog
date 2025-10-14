import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
export default function CategoriesPage() {
  return (
    <div className=" bg-slate-800 text-white p-4 min-h-full text-sm">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-center border-b-4 border-orange-500 text-2xl font-bold pb-2 mb-12">
          Categories
        </h1>
        <div className="flex flex-col gap-4 items-center p-4 border-2 rounded-md w-full max-w-sm  border-orange-500 ">
          <h2 className="border-b-2 ">Add Category</h2>
          <input
            type="text"
            placeholder="add a category"
            max={20}
            className="placeholder-gray-500 border-2 border-slate-500 rounded-md px-2 py-1 outline-none w-full placeholder:py-2"
          />
          <button className="bg-orange-500 px-4 py-1 w-full rounded-md hover:bg-white hover:text-orange-500 transition-all duration-500 cursor-pointer">
            Send
          </button>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-6 border-2 border-orange-500 rounded-md bg-slate-800 text-white p-6 ">
            <p>Category name</p>
            <div className="flex items-center justify-between w-full font-bold text-lg md:text-2xl">
              <button className="hover:scale-125 transition-all cursor-pointer duration-300 hover:text-orange-500">
                <FaEdit />
              </button>
              <button className="hover:scale-110 transition-all cursor-pointer duration-300 hover:text-orange-500">
                <FaTrashCan />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
