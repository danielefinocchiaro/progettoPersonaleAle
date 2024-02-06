import React from "react";
import SidebarTop from "../components/SidebarTop";
import SidebarBottom from "../components/SidebarBottom";
export default function SideBar() {
  return (
    <div className="bg-neutral-900 w-96 rounded-md flex flex-col">
      <SidebarTop />
      <SidebarBottom />
    </div>
  );
}
