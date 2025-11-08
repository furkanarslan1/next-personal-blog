import { prisma } from "@lib/prisma";
import React from "react";
import DeleteBlogButton from "./components/DeleteBlogButton";

interface allBlogsType {
  id: string;
  title: string;
}

async function getBlogs(): Promise<allBlogsType[]> {
  const allBlogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return allBlogs;
}

export default async function DelteteBlog() {
  const blogs = await getBlogs();
  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2">All Blogs</h2>
        <ul className="space-y-2 ">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="border p-2 rounded-md flex items-center justify-between"
            >
              <p>{blog.title}</p>
              <DeleteBlogButton id={blog.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
