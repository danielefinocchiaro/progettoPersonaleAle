import Sidebar from "../components/SideBar";
import PrincipalSection from "../components/PrincipalSection";
export default function Dashboard() {
  return (
    <div className="bg-black h-full w-screen p-2 flex">
      <Sidebar />
      <PrincipalSection />
    </div>
  );
}
