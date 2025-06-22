import SidebarTop from "./SidebarTop";
import SidebarBottom from "./SidebarBottom";
import { useAudio } from "~/use-audio";
import { useMobile } from "~/use-mobile";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import library from "../assets/library.json";
import { useState } from "react";
// Import specific types needed for our component
import type { ReactNode } from "react";

// Define a more specific type for our artist items
type ArtistItem = {
  id: number;
  name: string;
  link: string;
  audio: string;
  artist?: string;
};

export default function SideBar() {
  const { isPlaying, song, play, pause } = useAudio();
  const isMobile = useMobile();
  const [showAll, setShowAll] = useState(false);

  // Function to play a song when clicking on a row
  const handlePlayPause = (artist: ArtistItem) => {
    if (isPlaying && song?.id === artist.id) {
      pause();
    } else {
      play(artist);

      // Add haptic feedback for mobile devices if supported
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(5);
      }
    }
  };

  // Take the first 5 artists or all if showAll is true
  const displayedArtists = showAll
    ? library.artists
    : library.artists.slice(0, 5);

  return (
    <div className="w-96 rounded-t-md rounded-b-md flex flex-col sticky z-10 gap-y-2">
      <SidebarTop />

      {/* Recent Artists/Songs List */}
      <div className="bg-[#121212] gap-6 px-6 py-4 rounded-t-md rounded-b-md">
        <div className="p-3 pb-1">
          <h3 className="text-white font-bold mb-2">Ultimi ascolti</h3>
        </div>

        {/* List of artists */}
        <div className="space-y-1 px-2">
          {displayedArtists.map((artist) => (
            <button
              type="button"
              key={artist.id}
              onClick={() => handlePlayPause(artist)}
              className="flex items-center p-2 hover:bg-[#2a2a2a] rounded-md cursor-pointer transition-colors group w-full text-left"
              onKeyDown={(e) => e.key === "Enter" && handlePlayPause(artist)}
              aria-label={`Play ${artist.name}`}
            >
              <div className="mr-3 relative">
                <img
                  src={artist.link}
                  alt={artist.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                {isPlaying && song?.id === artist.id && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1DB954] rounded-full flex items-center justify-center">
                    <SpeakerWaveIcon className="text-black w-2 h-2" />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <p className="text-white text-sm font-medium truncate">
                  {artist.name}
                </p>
                <p className="text-gray-400 text-xs">Artist</p>
              </div>
              {isPlaying && song?.id === artist.id ? (
                <PauseCircleIcon className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100" />
              ) : (
                <PlayCircleIcon className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100" />
              )}
            </button>
          ))}
        </div>

        {/* Show more/less button */}
        {library.artists.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-gray-400 hover:text-white text-sm px-3 py-2 w-full text-left"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}
