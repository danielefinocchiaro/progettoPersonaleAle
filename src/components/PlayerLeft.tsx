import { HeartIcon } from "@heroicons/react/24/outline";
import Player from "./Player";
import { useAudio } from "~/use-audio";

export default function PlayerLeft() {
  const { song } = useAudio();
  return (
    <div className=" flex-row flex items-center gap-x-2 w-1/4">
      {song && (
        <>
          <img src={song?.link} className="h-14 w-14 rounded-[4px] mx-2 mt-3" />
          <div className="flex flex-col text-sm items-start justify-center">
            <p className="text-white hover:underline">{song?.name}</p>
            <p className="text-neutral-400 text-xs hover:underline hover:text-white">
              {song?.artist}
            </p>
          </div>
          <HeartIcon className="h-5 w-5 text-neutral-400 m-3 hover:scale-105 hover:text-white" />
        </>
      )}
    </div>
  );
}
