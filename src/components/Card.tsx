import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import type { LibraryData } from "../types";
import { useAudio } from "~/use-audio";
import { useMobile } from "~/use-mobile";

interface CardProps {
  item: LibraryData;
  withAudio?: boolean;
}

export default function Card({ item, withAudio = false }: CardProps) {
  const { isPlaying, song, play, pause } = useAudio();
  const isMobile = useMobile();

  const handlePlayPause = () => {
    if (!withAudio) return;

    if (isPlaying && song?.id === item.id) {
      pause();
    } else {
      play(item);

      // Add haptic feedback for mobile devices if supported
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(5); // Very short, subtle vibration
      }
    }
  };

  return (
    <div
      className="h-[18.5rem] min-w-52 flex flex-col m-1 mr-4 text-white bg-neutral-800 hover:bg-[#3E3E3E] rounded-lg gap-3 my-1 items-start p-4 group hover:cursor-pointer"
      onClick={isMobile && withAudio ? handlePlayPause : undefined}
      onKeyDown={
        isMobile && withAudio
          ? (e) => e.key === "Enter" && handlePlayPause()
          : undefined
      }
      tabIndex={isMobile && withAudio ? 0 : undefined}
      role={isMobile && withAudio ? "button" : undefined}
      aria-label={
        isMobile && withAudio
          ? `Play ${item.name} by ${item.artist}`
          : undefined
      }
    >
      <div className="flex justify-around relative">
        <img
          src={item.link}
          alt={`${item.name} by ${item.artist}`}
          className="rounded-md"
        />
        {isPlaying && song?.id === item.id ? (
          <PauseCircleIcon
            className={`h-16 w-16 absolute order-last cursor-pointer 
              ${
                isMobile
                  ? "opacity-80 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-black/50 rounded-full p-2"
                  : "opacity-0 group-hover:opacity-100 bottom-0 right-0 p-1 justify-items-end"
              }`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering parent div click on non-mobile
              handlePlayPause();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePlayPause();
              }
            }}
            aria-label={`Pause ${item.name}`}
          />
        ) : (
          <PlayCircleIcon
            className={`h-16 w-16 absolute order-last cursor-pointer 
              ${
                isMobile
                  ? "opacity-80 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-black/50 rounded-full p-2"
                  : "opacity-0 group-hover:opacity-100 bottom-0 right-0 p-1 justify-items-end"
              }`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering parent div click on non-mobile
              handlePlayPause();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePlayPause();
              }
            }}
            aria-label={`Play ${item.name}`}
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
