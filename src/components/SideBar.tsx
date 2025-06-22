import SidebarTop from "./SidebarTop";
import SidebarBottom from "./SidebarBottom";
import { useAudio } from "~/use-audio";
import { useMobile } from "~/use-mobile";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import library from "../assets/library.json";
import { useState, useEffect } from "react";
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

// Key for local storage
const RECENTLY_PLAYED_KEY = "recently_played_songs";

export default function SideBar() {
  const { isPlaying, song, play, pause } = useAudio();
  const isMobile = useMobile();
  const [showAll, setShowAll] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState<ArtistItem[]>([]);

  // Load recently played songs from local storage on initial render
  useEffect(() => {
    const savedRecent = localStorage.getItem(RECENTLY_PLAYED_KEY);
    if (savedRecent) {
      try {
        const parsedRecent = JSON.parse(savedRecent);
        setRecentlyPlayed(parsedRecent);
      } catch (e) {
        console.error("Failed to parse recently played songs:", e);
        setRecentlyPlayed([]);
      }
    } else {
      // Initialize with first song from library as an example
      setRecentlyPlayed(library.artists.slice(0, 3));
    }
  }, []);

  // Update recently played list when a song is played
  useEffect(() => {
    if (song) {
      setRecentlyPlayed((prevList) => {
        // Create a new array without the current song (if it exists)
        const filteredList = prevList.filter((item) => item.id !== song.id);

        // Make sure song has all required fields for ArtistItem
        const songToAdd: ArtistItem = {
          id: song.id as number,
          name: song.name,
          link: song.link || song.img || "", // Use link or img if available
          audio: song.audio || "",
          artist: song.artist as string,
        };

        // Add the current song to the beginning
        const updatedList = [songToAdd, ...filteredList].slice(0, 8);

        // Save to localStorage
        localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(updatedList));

        return updatedList;
      });
    }
  }, [song]);

  // Function to play a song when clicking on a row
  const handlePlayPause = (artist: ArtistItem) => {
    if (isPlaying && song?.id === artist.id) {
      pause();
    } else {
      // Ensure artist has all required properties for LibraryData
      const playableArtist = {
        ...artist,
        artist: artist.name, // Ensure artist property exists and is set to name
      };

      play(playableArtist);

      // Add haptic feedback for mobile devices if supported
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(5);
      }
    }
  };

  // Take the first 5 artists or a maximum of 8 if showAll is true
  const displayedArtists = showAll
    ? recentlyPlayed.slice(0, 8)
    : recentlyPlayed.slice(0, 5);

  return (
    <div className="w-96 rounded-t-md rounded-b-md flex flex-col sticky z-10 gap-y-2">
      <SidebarTop />

      {/* Recent Artists/Songs List */}
      <div className="bg-[#121212] gap-6 px-6 py-4 rounded-t-md rounded-b-md">
        <div className="p-3 pb-1">
          <h3 className="text-white font-bold mb-2">Ultimi ascolti</h3>
        </div>

        {/* List of recently played songs */}
        <div className="space-y-1 px-2">
          {displayedArtists.length > 0 ? (
            displayedArtists.map((artist) => (
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
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/40"; // Fallback image if link fails
                    }}
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
                  <p className="text-gray-400 text-xs">
                    {artist.artist && artist.artist !== artist.name
                      ? artist.artist
                      : "Artist"}
                  </p>
                </div>
                <div className="transition-opacity duration-200 ease-in-out">
                  {isPlaying && song?.id === artist.id ? (
                    <PauseCircleIcon className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100" />
                  ) : (
                    <PlayCircleIcon className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center p-4">
              No recently played songs. Start playing to build your history!
            </p>
          )}
        </div>

        {/* Show more/less button - only if we have more than 5 items */}
        {recentlyPlayed.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-gray-400 hover:text-white text-sm px-3 py-2 w-full text-left transition-colors"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}
