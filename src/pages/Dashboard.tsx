import Sidebar from "../components/SideBar";
import PrincipalSection from "../components/PrincipalSection";
import SectionPlayer from "../components/SectionPlayer";
import { useState, useEffect } from "react";
import { useMobile } from "~/use-mobile";
import { MobileTabs } from "~/components/MobileTabs";

export default function Dashboard() {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're in mobile view on component mount
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    checkMobileView();

    // Add resize listener
    window.addEventListener("resize", checkMobileView);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const isMobile = useMobile();

  return (
    <div className="bg-black h-full !overflow-y-hidden w-screen p-2 flex flex-col">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar is only visible in desktop view by default */}
        <div className={`${isMobileView ? "hidden" : "block"}`}>
          <Sidebar />
        </div>
        <PrincipalSection />
      </div>
      <SectionPlayer />
      {isMobile && <MobileTabs />}
    </div>
  );
}
