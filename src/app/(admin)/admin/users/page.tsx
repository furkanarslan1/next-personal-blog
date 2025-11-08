import { prisma } from "@lib/prisma";
import React from "react";
import DeleteUserButton from "./components/DeleteUserButton";

interface allUserType {
  id: string;
  name: string | null;
  email: string | null;
}
async function getUsers(): Promise<allUserType[]> {
  const allUser = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { createdAt: "desc" },
  });
  return allUser;
}

export default async function UserPage() {
  const users = await getUsers();
  return (
    <div className="bg-black min-h-screen text-white h-screen">
      <h1 className="font-bold text-center p-4 text-4xl border-b-2 border-orange-500 ">
        Users
      </h1>
      <div className="mt-6">
        <ul className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {users?.map((user) => (
            <li
              key={user.id}
              className="flex flex-col items-center gap-4 p-4 bg-slate-800 text-white w-full rounded-md"
            >
              <p className="flex items-center gap-1">
                <span className="font-bold">Name: </span>
                {user.name}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-bold">E-mail: </span>
                {user.email}
              </p>
              <div className="">
                <DeleteUserButton id={user.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
