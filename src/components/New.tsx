import { useAudio } from "~/use-audio";
import { useMobile } from "~/use-mobile";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import library from "../assets/library.json";
import type { LibraryData } from "../types";

export default function New() {
  const { isPlaying, song, play, pause } = useAudio();
  const isMobile = useMobile();

  // Create mock items that match the LibraryData structure
  const mockItems: (LibraryData & { type: string })[] = [
    {
      id: "ernia",
      name: "Ernia",
      type: "artist",
      img: "https://i.scdn.co/image/ab6761610000e5ebfc9ae482b4fdedc7210d5ff2",
      audio: library.artists[0]?.audio || "",
      artist: "Ernia",
      link: "",
    },
    {
      id: "doom",
      name: "DOOM",
      type: "album",
      img: "https://i.scdn.co/image/ab67616d0000b273315d6590f6d858f6066482da",
      audio: library.artists[1]?.audio || "",
      artist: "Nayt",
      link: "",
      ArtistsOnAlbums: [{ artist: { name: "Nayt" } }],
    },
    {
      id: "weeknd",
      name: "The Weeknd",
      type: "artist",
      img: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb",
      audio: library.artists[2]?.audio || "",
      artist: "The Weeknd",
      link: "",
    },
    {
      id: "mixindie",
      name: "Mix Indie",
      type: "playlist",
      img: "https://i.scdn.co/image/ab67616d0000b2730e2dbf7a143356b19f166be1",
      audio: library.artists[3]?.audio || "",
      artist: "Various Artists",
      link: "",
      author: { username: "Spotify" },
    },
  ];

  const handlePlayItem = (item: LibraryData) => {
    if (isPlaying && song?.id === item.id) {
      pause();
    } else {
      play(item);

      // Add haptic feedback for mobile devices if supported
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(5);
      }
    }
  };

  return (
    <div>
      {mockItems.map((item) => {
        const isCurrentlyPlaying = isPlaying && song?.id === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handlePlayItem(item)}
            className="w-full flex flex-row text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 gap-3 items-center group"
            aria-label={
              isCurrentlyPlaying ? `Pause ${item.name}` : `Play ${item.name}`
            }
          >
            <div className="h-12 w-12 ml-2 relative">
              <img
                src={item.img}
                className={`h-full w-full ${item.type === "artist" ? "rounded-full" : "rounded-sm"}`}
                alt={`${item.name} cover`}
              />
              {isCurrentlyPlaying && (
                <div className="absolute bottom-0 right-0">
                  <SpeakerWaveIcon className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
            <div className="flex flex-col font-medium text-left">
              <div>{item.name}</div>
              <div className="text-neutral-400">
                {item.type === "artist"
                  ? "Artista"
                  : item.type === "album"
                    ? `Album • ${item.artist}`
                    : `Playlist • ${item.author}`}
              </div>
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
      })}
    </div>
  );
}
