import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import type { LibraryData } from "../types";
import { useAudio } from "~/use-audio";

interface CardProps {
  item: LibraryData;
  withAudio?: boolean;
}

export default function Card({ item, withAudio = false }: CardProps) {
  const { isPlaying, song, play, pause } = useAudio();

  const handlePlayPause = () => {
    if (!withAudio) return;

    if (isPlaying && song?.id === item.id) {
      pause();
    } else {
      play(item);
    }
  };

  return (
    <div className="h-[18.5rem] min-w-52 flex flex-col m-1 mr-4 text-white bg-neutral-800 hover:bg-[#3E3E3E] rounded-lg gap-3 my-1 items-start p-4 group hover:cursor-pointer">
      <div className="flex justify-around relative">
        <img
          src={item.link}
          alt={`${item.name} by ${item.artist}`}
          className="rounded-md"
        />
        {isPlaying && song?.id === item.id ? (
          <PauseCircleIcon
            className="h-16 w-16 opacity-0 absolute bottom-0 right-0 group-hover:opacity-100 order-last p-1 justify-items-end cursor-pointer"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleIcon
            className="h-16 w-16 opacity-0 absolute bottom-0 right-0 group-hover:opacity-100 order-last p-1 justify-items-end cursor-pointer"
            onClick={handlePlayPause}
          />
        )}
      </div>
      <div className="flex flex-col font-medium">
        <div>{item.name}</div>
        <div className="text-neutral-400">{item.artist}</div>
      </div>
    </div>
  );
}
