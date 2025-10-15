import Link from "next/link";
import React from "react";

export default function AdminBlogs() {
  return (
    <div className=" bg-slate-800 text-white p-4 min-h-full text-sm">
      <h1 className="text-2xl  font-bold text-center border-b-2  pb-2 my-6">
        Blogs
      </h1>
      <div className="">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/"
            className="h-22 w-full border-2 flex items-center justify-center font-bold hover:bg-orange-500 transition-all duration-300"
          >
            Total Blogs
          </Link>

          <Link
            href="/admin/blogs/create"
            className="h-22 w-full border-2 flex items-center justify-center font-bold hover:bg-orange-500 transition-all duration-300"
          >
            Add Blog
          </Link>

          <Link
            href="/"
            className="h-22 w-full border-2 flex items-center justify-center font-bold hover:bg-orange-500 transition-all duration-300"
          >
            Delete Blog
          </Link>
        </ul>
      </div>
    </div>
  );
}
