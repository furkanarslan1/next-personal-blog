import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { adminLinks } from "@lib/constants/adminLinks";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className=" rounded-md text-center  text-slate-800">
      <Sheet defaultOpen>
        <SheetTrigger className="px-4 py-2 bg-slate-800 text-white rounded-md font-bold cursor-pointer border-2 border-slate-800">
          Admin Panel
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-slate-800 focus:ring-offset-transparent focus:ring-transparent focus:ring-0 [&>button]:text-white  hover:[&>button]:bg-slate-700 hover:[&>button]:cursor-pointer "
        >
          <SheetHeader>
            <SheetTitle className="text-orange-500 text-2xl font-extrabold border-b-4 pb-2">
              Admin Menu
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <ul className="flex flex-col gap-4 text-white items-start p-4 ">
              {adminLinks?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
