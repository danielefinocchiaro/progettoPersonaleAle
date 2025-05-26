import SidebarTop from "./SidebarTop";
import SidebarBottom from "./SidebarBottom";
export default function SideBar() {
  return (
    <div className=" w-96 rounded-t-md rounded-b-md flex flex-col sticky z-10">
      <SidebarTop />
      <SidebarBottom />
    </div>
  );
}
