import type { LibraryData } from "../types";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import { useAudio } from "~/use-audio";
import { useMobile } from "~/use-mobile";

export default function SectionRow(props: { artist: LibraryData }) {
  const { artist } = props;
  const { isPlaying, song, play, pause } = useAudio();
  const isMobile = useMobile();

  const handlePlayPause = () => {
    if (isPlaying && song?.id === artist.id) {
      pause();
    } else {
      play(artist);

      // Add haptic feedback for mobile devices if supported
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(5); // Very short, subtle vibration
      }
    }
  };
  return (
    <div
      className={`h-[3.0rem] ${isMobile ? "w-full" : "w-[13.4rem]"} flex flex-row m-1 text-white bg-neutral-800 hover:bg-[#3E3E3E] rounded-sm gap-2 my-1 items-center group hover:cursor-pointer`}
      onClick={isMobile ? handlePlayPause : undefined}
      onKeyDown={
        isMobile ? (e) => e.key === "Enter" && handlePlayPause() : undefined
      }
      tabIndex={isMobile ? 0 : undefined}
      role={isMobile ? "button" : undefined}
      aria-label={isMobile ? `Play ${artist.name}` : undefined}
    >
      {isPlaying && song?.id === artist.id ? (
        <PauseCircleIcon
          className={`h-8 w-8 order-last ml-auto mr-3 ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          onClick={(e) => {
            e.stopPropagation();
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
          aria-label={`Pause ${artist.name}`}
        />
      ) : (
        <PlayCircleIcon
          className={`h-8 w-8 order-last ml-auto mr-3 ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          onClick={(e) => {
            e.stopPropagation();
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
          aria-label={`Play ${artist.name}`}
        />
      )}
      <div className="min-h-12 min-w-12 h-12 w-12 flex-shrink-0 overflow-hidden">
        <img
          src={artist.link}
          alt={artist.name as string}
          className="h-full w-full object-cover rounded-sm"
        />
      </div>
      <div className="flex flex-col font-medium overflow-hidden">
        <div className="truncate">{artist.name}</div>
      </div>
    </div>
  );
}
