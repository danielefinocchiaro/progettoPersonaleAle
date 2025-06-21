import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { useAudio } from "~/use-audio";
export default function ControlsRigth() {
  const [green, setGreen] = useState("");
  const { volume, setVolume } = useAudio();

  return (
    <div className="text-neutral-400 flex gap-2 items-center">
      <SpeakerWaveIcon
        onClick={() => setGreen("wave")}
        className={` ${
          green === "wave" ? "text-green-500" : "text-white hover:text-white"
        }  w-5 transform duration-200 hover:cursor-pointer`}
      />
      <input
        type="range"
        onChange={(e) => setVolume(Number(e.target.value) / 100)}
        min="0"
        max="100"
        value={volume * 100}
        className={` ${
          green === "wave" ? "bg-green-500" : "text-white hover:text-white"
        }  "w-[6rem]" transform duration-200 hover:cursor-pointer`}
      />
    </div>
  );
}
