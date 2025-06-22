import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAudio } from "~/use-audio";

// Format time in seconds to MM:SS format
const formatTime = (timeInSeconds: number): string => {
  if (Number.isNaN(timeInSeconds)) return "0:00";

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default function Player() {
  const { isPlaying, audioRef, pause, resume, song, seek } = useAudio();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [seekValue, setSeekValue] = useState<number>(0);

  // Update current time and duration when audio plays
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

    // Set up event listeners
    audio.addEventListener("timeupdate", updateTimeValues);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    // Initial values
    if (audio.duration) setDuration(audio.duration);
    setCurrentTime(audio.currentTime);
    setSeekValue(audio.currentTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTimeValues);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, [audioRef.current, seeking]);

  // Handle seeking
  const handleSeekStart = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeekValue(Number(e.target.value));
  };

  const handleSeekEnd = () => {
    if (!audioRef.current) return;

    seek(seekValue);
    setCurrentTime(seekValue);
    setSeeking(false);
  };

  // Calculate progress percentage for styling
  const progressPercentage =
    duration > 0 ? ((seeking ? seekValue : currentTime) / duration) * 100 : 0;

  const progressStyle = {
    background: `linear-gradient(to right, #1DB954 ${progressPercentage}%, #444 ${progressPercentage}%)`,
  };

  return (
    <div className="flex flex-col-reverse items-center text-neutral-800 font-semibold">
      <div className="gap-2 flex items-center text-neutral-400">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          onMouseDown={handleSeekStart}
          onTouchStart={handleSeekStart}
          onChange={handleSeekChange}
          onMouseUp={handleSeekEnd}
          onTouchEnd={handleSeekEnd}
          onKeyUp={handleSeekEnd}
          onFocus={!song ? undefined : handleSeekStart}
          min="0"
          max={duration || 100}
          step="0.01"
          value={seeking ? seekValue : currentTime}
          id="range"
          className="w-96"
          style={progressStyle}
          disabled={!song}
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="text-neutral-400 h-48 w-48 flex gap-3 mt-2 items-center justify-center">
        <ChevronLeftIcon className="size-8 hover:text-white cursor-pointer" />
        {isPlaying ? (
          <PauseCircleIcon
            className="size-8 hover:text-white cursor-pointer"
            onClick={pause}
          />
        ) : (
          <PlayCircleIcon
            className={`size-8 ${song ? "hover:text-white cursor-pointer" : "text-neutral-600 cursor-not-allowed"}`}
            onClick={song ? resume : undefined}
          />
        )}
        <ChevronRightIcon className="size-8 hover:text-white cursor-pointer" />
      </div>
      {song && (
        <div className="text-center mb-2">
          <div className="text-white font-medium">{song.name}</div>
          <div className="text-neutral-400 text-sm">{song.artist}</div>
        </div>
      )}
    </div>
  );
}
