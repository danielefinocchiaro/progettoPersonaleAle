import { useMobile } from "~/use-mobile";
import ControlsRigth from "./ControlsRight";
import Player from "./Player";
import PlayerLeft from "./PlayerLeft";
import { PlayIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";

const SpeakerIcon = ({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 30 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Speaker cabinet */}
      <rect
        x="1"
        y="1"
        width="28"
        height="40"
        rx="6"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />

      {/* Tweeter (small top driver) */}
      <circle cx="15" cy="12" r="3" fill={color} />

      {/* Woofer (large bottom driver) */}
      <circle
        cx="15"
        cy="28"
        r="6"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

const MobilePlayer = () => {
  return (
    <div className="text-white w-full rounded-lg bg-[#59241C] overflow-clip">
      <div className="flex items-center gap-3 p-2">
        <img
          src="https://i.scdn.co/image/ab67616d0000b273da1ab5d4bdae792d8ec0b5fc"
          className="size-12 rounded-md"
        />
        <div>
          <p>cosa conta davvero</p>
          <p className="text-white/75 text-sm hover:underline hover:text-white">
            Lazza, Artie 5ive
          </p>
        </div>

        <div className="flex gap-4 items-center ml-auto mr-2">
          <SpeakerIcon color="white" className="size-8 text-white" />
          <PlayIcon className="size-8 text-white" />
        </div>
      </div>
      <div className="bg-white/15">
        <div className="bg-white h-1 w-1/3"></div>
      </div>
    </div>
  );
};
export default function SectionPlayer() {
  const isMobile = useMobile();

  return isMobile ? (
    <MobilePlayer />
  ) : (
    <div className="sticky bottom-0 z-10 h-[10vh] justify-between flex flex-row">
      <PlayerLeft />
      <Player />
      <ControlsRigth />
    </div>
  );
}
