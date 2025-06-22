import type { LibraryData } from "../types";
import library from "../assets/library.json";
import { useAudio } from "~/use-audio";
import { useMobile } from "~/use-mobile";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

export default function LibraryRow(props: { data: LibraryData; type: string }) {
  const { data, type } = props;
  const { isPlaying, song, play, pause } = useAudio();
  const isMobile = useMobile();

  const isCurrentlyPlaying = isPlaying && song?.id === data.id;

  const handlePlayItem = () => {
    if (isCurrentlyPlaying) {
      pause();
    } else {
      play(data);

      // Add haptic feedback for mobile devices if supported
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(5);
      }
    }
  };

  // Common button props
  const buttonProps = {
    type: "button" as const,
    onClick: handlePlayItem,
    "aria-label": isCurrentlyPlaying
      ? `Pause ${data.name}`
      : `Play ${data.name}`,
  };

  // Render based on type
  if (type === "artist") {
    return (
      <button
        {...buttonProps}
        className="w-full flex flex-row text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 gap-3 items-center group"
      >
        <div className="h-12 w-12 ml-2 relative">
          <img
            src={data.img}
            className="h-full w-full rounded-full"
            alt={`${data.name} profile`}
          />
          {isCurrentlyPlaying && (
            <div className="absolute bottom-0 right-0">
              <SpeakerWaveIcon className="h-4 w-4 text-green-500" />
            </div>
          )}
        </div>
        <div className="flex flex-col font-medium text-left">
          <div>{data.name}</div>
          <div className="text-neutral-400">Artista</div>
        </div>
        <div className="ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {isCurrentlyPlaying ? (
            <PauseCircleIcon className="h-8 w-8" />
          ) : (
            <PlayCircleIcon className="h-8 w-8" />
          )}
        </div>
      </button>
    );
  }

  if (type === "album") {
    return (
      <button
        {...buttonProps}
        className="w-full flex flex-row gap-3 text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 items-center group"
      >
        <div className="w-12 h-12 ml-2 relative">
          <img
            src={data.img}
            className="rounded-sm"
            alt={`${data.name} album cover`}
          />
          {isCurrentlyPlaying && (
            <div className="absolute bottom-0 right-0">
              <SpeakerWaveIcon className="h-4 w-4 text-green-500" />
            </div>
          )}
        </div>
        <div className="flex flex-col font-medium text-left">
          <div>{data.name}</div>
          <div className="text-neutral-400">{`Album • ${data.ArtistsOnAlbums?.map(
            (artist) => {
              return artist.artist.name;
            },
          ).join(", ")}`}</div>
        </div>
        <div className="ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {isCurrentlyPlaying ? (
            <PauseCircleIcon className="h-8 w-8" />
          ) : (
            <PlayCircleIcon className="h-8 w-8" />
          )}
        </div>
      </button>
    );
  }

  // Default case (playlist)
  return (
    <button
      {...buttonProps}
      className="w-full flex flex-row text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 gap-3 items-center group"
    >
      <div className="w-12 h-12 ml-2 relative">
        <img
          src={data.img}
          className="rounded-sm"
          alt={`${data.name} playlist cover`}
        />
        {isCurrentlyPlaying && (
          <div className="absolute bottom-0 right-0">
            <SpeakerWaveIcon className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>
      <div className="flex flex-col font-medium text-left">
        <div>{data.name}</div>
        <div className="text-neutral-400">{`Playlist • ${data.author.username}`}</div>
      </div>
      <div className="ml-auto mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isCurrentlyPlaying ? (
          <PauseCircleIcon className="h-8 w-8" />
        ) : (
          <PlayCircleIcon className="h-8 w-8" />
        )}
      </div>
    </button>
  );
}
