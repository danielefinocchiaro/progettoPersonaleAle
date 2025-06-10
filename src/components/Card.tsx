import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import type { LibraryData } from "../types";

interface CardProps {
  item: LibraryData;
  withAudio?: boolean;
}

// Variable to track active audio
let activeAudio: HTMLAudioElement | null = null;

export default function Card({ item, withAudio = false }: CardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!withAudio || !audioRef.current) return;

    // If there's another audio playing, stop it
    if (activeAudio && activeAudio !== audioRef.current) {
      activeAudio.pause();
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback error:", error));
    }

    // Update active audio reference
    activeAudio = audioRef.current;
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-[18.5rem] min-w-52 flex flex-col m-1 mr-4 text-white bg-neutral-800 hover:bg-[#3E3E3E] rounded-lg gap-3 my-1 items-start p-4 group hover:cursor-pointer">
      <div className="flex justify-around relative">
        {withAudio && item.audio && (
          <audio ref={audioRef}>
            <source src={item.audio} type="audio/mpeg" />
            <track kind="captions" src="" label="English captions" />
          </audio>
        )}

        <img
          src={item.link}
          alt={`${item.name} by ${item.artist}`}
          className="rounded-md"
        />
        <PlayCircleIcon
          className="h-16 w-16 opacity-0 absolute bottom-0 right-0 group-hover:opacity-100 order-last p-1 justify-items-end cursor-pointer"
          onClick={withAudio ? handlePlayPause : undefined}
        />
      </div>
      <div className="flex flex-col font-medium">
        <div>{item.name}</div>
        <div className="text-neutral-400">{item.artist}</div>
      </div>
    </div>
  );
}
