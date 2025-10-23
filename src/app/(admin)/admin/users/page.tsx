import { prisma } from "@lib/prisma";
import React from "react";

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
    <div className="bg-black text-white h-screen">
      <h1 className="font-bold text-center p-4 text-4xl border-b-2 border-orange-500 ">
        Users
      </h1>
      <div className="mt-6">
        <ul className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {users?.map((user) => (
            <li
              key={user.id}
              className="flex flex-col gap-2 p-4 bg-orange-500 w-fit rounded-md"
            >
              <p className="flex items-center gap-1">
                <span className="font-bold">Name: </span>
                {user.name}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-bold">E-mail: </span>
                {user.email}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
