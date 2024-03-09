import React from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function SidebarTop() {
  return (
    <div className="flex flex-col bg-[#121212] w-96 rounded-t-md rounded-b-md gap-6 px-6 py-4 ml-1 h-[16vh]">
      <div className="flex flex-row items-center space-x-4 text-neutral-400 hover:text-white ">
        <HomeIcon className="w-6 h-6" />
        <p className="font-bold"> Home </p>
      </div>
      <div className="flex flex-row items-center space-x-4 text-neutral-400 hover:text-white ">
        <MagnifyingGlassIcon className="w-6 h-6" />
        <p className="font-bold"> Cerca </p>
      </div>
    </div>
  );
}
