import { useMobile } from "~/use-mobile";
import ControlsRigth from "./ControlsRight";
import Player from "./Player";
import PlayerLeft from "./PlayerLeft";
import MobilePlayer from "./MobilePlayer";

export default function SectionPlayer() {
  const isMobile = useMobile();

  return (
    <>
      {/* Mobile player - only visible on mobile screens */}
      <div
        className={`md:hidden ${isMobile ? "block" : "hidden"} fixed bottom-0 left-0 right-0 z-20`}
      >
        <MobilePlayer />
      </div>

      {/* Desktop player - only visible on desktop screens */}
      <div
        className={`hidden md:flex ${!isMobile ? "flex" : "hidden"} sticky bottom-0 z-10 h-[10vh] justify-between flex-row`}
      >
        <PlayerLeft />
        <Player />
        <ControlsRigth />
      </div>
    </>
  );
}
