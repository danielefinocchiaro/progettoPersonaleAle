import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAudio } from "~/use-audio";

export default function Player() {
  const { isPlaying, audioRef, pause, resume } = useAudio();
  const [progress, setProgress] = useState<string>("15");

  if (audioRef.current) {
    audioRef.current.ontimeupdate = () => {
      setProgress(audioRef.current?.currentTime.toString() || "0");
    };
  }

  return (
    <div className="flex flex-col-reverse items-center text-neutral-800 font-semibold">
      <div className=" gap-2 flex items-center text-neutral-400">
        <span> 0:35 </span>
        <input
          type="range"
          onChange={(e) => setProgress(e.target.value)}
          min="0"
          max="100"
          value={progress}
          id="range"
          className={`w-96 bg-[linear-gradient(to right, #f50 10%, #ccc 20%)]`}
        />
        <span> 2:48 </span>
      </div>
      <div className="text-neutral-400 h-48 w-48 flex gap-3 mt-2 items-center justify-center">
        <ChevronLeftIcon className="size-8 hover:text-white" />
        {isPlaying ? (
          <PauseCircleIcon
            className="size-8 hover:text-white"
            onClick={pause}
          />
        ) : (
          <PlayCircleIcon
            className="size-8 hover:text-white"
            onClick={resume}
          />
        )}
        <ChevronRightIcon className="size-8 hover:text-white" />
      </div>
    </div>
  );
}
