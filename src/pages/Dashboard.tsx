import Sidebar from "../components/SideBar";
import PrincipalSection from "../components/PrincipalSection";
import SectionPlayer from "../components/SectionPlayer";
export default function Dashboard() {
  return (
    <div className="bg-black !overflow-y-hidden w-screen p-2 flex flex-col">
      <div className="flex ">
        <Sidebar />
        <PrincipalSection />
      </div>
      <SectionPlayer />
    </div>
  );
}
