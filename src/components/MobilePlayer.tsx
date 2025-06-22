import { PauseCircleIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAudio } from "~/use-audio";

// Format time in seconds to MM:SS format
const formatTime = (timeInSeconds: number): string => {
  if (Number.isNaN(timeInSeconds)) return "0:00";

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const SpeakerIcon = ({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 30 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Speaker Icon"
      role="img"
    >
      {/* Speaker cabinet */}
      <rect
        x="1"
        y="1"
        width="28"
        height="40"
        rx="6"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />

      {/* Tweeter (small top driver) */}
      <circle cx="15" cy="12" r="3" fill={color} />

      {/* Woofer (large bottom driver) */}
      <circle
        cx="15"
        cy="28"
        r="6"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

export default function MobilePlayer() {
  const { isPlaying, audioRef, pause, resume, song, seek } = useAudio();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [seekValue, setSeekValue] = useState<number>(0);

  // Use the same time update logic as the main Player component
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTimeValues = () => {
      if (!seeking) {
        setCurrentTime(audio.currentTime);
        setSeekValue(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTimeValues);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    if (audio.duration) setDuration(audio.duration);
    setCurrentTime(audio.currentTime);
    setSeekValue(audio.currentTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTimeValues);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, [audioRef.current, seeking]);

  // Handle seeking in mobile view
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSeekValue(newValue);
    seek(newValue);
    setCurrentTime(newValue);
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="text-white w-full rounded-t-lg bg-[#59241C] overflow-hidden shadow-lg border-t border-neutral-700">
      <div className="flex items-center gap-3 p-3">
        {song ? (
          <img
            src={song.link}
            alt={`${song.name} by ${song.artist}`}
            className="size-14 rounded-md shadow-sm"
          />
        ) : (
          <div className="size-14 rounded-md bg-neutral-800 flex items-center justify-center">
            <SpeakerIcon color="white" className="size-8 opacity-50" />
          </div>
        )}

        <div className="overflow-hidden">
          <p className="font-medium text-sm truncate max-w-[150px] sm:max-w-[200px]">{song?.name || "Not Playing"}</p>
          <p className="text-white/75 text-xs hover:underline hover:text-white truncate max-w-[150px] sm:max-w-[200px]">
            {song?.artist || "Select a song"}
          </p>
        </div>

        <div className="flex gap-4 items-center ml-auto mr-2">
          {isPlaying ? (
            <PauseCircleIcon
              className="size-8 text-white cursor-pointer"
              onClick={pause}
            />
          ) : (
            <PlayIcon
              className={`size-8 ${song ? "text-white cursor-pointer" : "text-white/50 cursor-not-allowed"}`}
              onClick={song ? resume : undefined}
            />
          )}
        </div>
      </div>
      <div className="bg-white/15 relative h-2">
        <input
          type="range"
          onChange={handleSeekChange}
          min="0"
          max={duration || 100}
          step="0.01"
          value={currentTime}
          className="absolute inset-0 opacity-0 w-full cursor-pointer z-10"
          disabled={!song}
        />
        <div
          className="bg-[#1DB954] h-2 relative"
          style={{ width: `${progressPercentage}%` }}
        >
          {song && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
          )}
        </div>
      </div>
      {song && (
        <div className="flex justify-between text-xs text-white/60 px-2 py-1">
          <span className="min-w-[30px]">{formatTime(currentTime)}</span>
          <span className="min-w-[30px] text-right">{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
}
