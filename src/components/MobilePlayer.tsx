import {
  PauseCircleIcon,
  SpeakerWaveIcon as SpeakerOutlineIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
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
  const { isPlaying, audioRef, pause, resume, song, seek, volume, setVolume } =
    useAudio();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [seekValue, setSeekValue] = useState<number>(0);
  const [showVolumeControl, setShowVolumeControl] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(1);
  const volumeControlRef = useRef<HTMLDivElement>(null);

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

  // Handle seeking in mobile view with haptic feedback
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSeekValue(newValue);
    seek(newValue);
    setCurrentTime(newValue);

    // Add haptic feedback at 25%, 50%, 75% points of the song
    if (navigator.vibrate && duration > 0) {
      const percentage = (newValue / duration) * 100;
      if (
        Math.abs(percentage - 25) < 1 ||
        Math.abs(percentage - 50) < 1 ||
        Math.abs(percentage - 75) < 1
      ) {
        navigator.vibrate(5); // Short vibration
      }
    }
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle volume mute/unmute
  const handleMuteToggle = () => {
    if (isMuted) {
      // Unmute: restore previous volume
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      // Mute: save current volume and set to 0
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  // Handle volume change with haptic feedback
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);

    // Add haptic feedback if supported and at certain thresholds
    if (navigator.vibrate) {
      // Vibrate at specific thresholds or when muting/unmuting
      if (
        newVolume === 0 ||
        newVolume === 1 ||
        (volume > 0.5 && newVolume <= 0.5) ||
        (volume <= 0.5 && newVolume > 0.5)
      ) {
        navigator.vibrate(5); // Very short, subtle vibration
      }
    }

    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  // Toggle volume control visibility
  const toggleVolumeControl = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowVolumeControl(!showVolumeControl);
  };

  // Calculate volume percentage for styling
  const volumePercentage = volume * 100;

  // Create the gradient style for the volume slider
  const volumeStyle = {
    background: `linear-gradient(to right, #1DB954 ${volumePercentage}%, #444 ${volumePercentage}%)`,
  };

  // This effect prevents the dialog from closing immediately after opening
  useEffect(() => {
    if (showVolumeControl) {
      // We'll add a small timeout to ensure immediate click events don't cause closing
      const preventImmediateClose = () => {
        // This function does nothing - it just prevents events from bubbling during the timeout
        const handler = (e: MouseEvent | TouchEvent) => {
          e.stopPropagation();
        };

        // Add event listeners to catch any clicks/touches right after opening
        document.addEventListener("click", handler, { capture: true });
        document.addEventListener("touchstart", handler, { capture: true });

        // Remove them after a short delay
        const timer = setTimeout(() => {
          document.removeEventListener("click", handler, { capture: true });
          document.removeEventListener("touchstart", handler, {
            capture: true,
          });
        }, 100);

        return () => {
          clearTimeout(timer);
          document.removeEventListener("click", handler, { capture: true });
          document.removeEventListener("touchstart", handler, {
            capture: true,
          });
        };
      };

      const cleanup = preventImmediateClose();
      return cleanup;
    }
  }, [showVolumeControl]);

  // This effect prevents the dialog from closing immediately after opening
  useEffect(() => {
    if (showVolumeControl) {
      // We'll add a small timeout to ensure immediate click events don't cause closing
      const preventImmediateClose = () => {
        // This function does nothing - it just prevents events from bubbling during the timeout
        const handler = (e: MouseEvent | TouchEvent) => {
          e.stopPropagation();
        };

        // Add event listeners to catch any clicks/touches right after opening
        document.addEventListener("click", handler, { capture: true });
        document.addEventListener("touchstart", handler, { capture: true });

        // Remove them after a short delay
        const timer = setTimeout(() => {
          document.removeEventListener("click", handler, { capture: true });
          document.removeEventListener("touchstart", handler, {
            capture: true,
          });
        }, 100);

        return () => {
          clearTimeout(timer);
          document.removeEventListener("click", handler, { capture: true });
          document.removeEventListener("touchstart", handler, {
            capture: true,
          });
        };
      };

      const cleanup = preventImmediateClose();
      return cleanup;
    }
  }, [showVolumeControl]);

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
          <p className="font-medium text-sm truncate max-w-[150px] sm:max-w-[200px]">
            {song?.name || "Not Playing"}
          </p>
          <p className="text-white/75 text-xs hover:underline hover:text-white truncate max-w-[150px] sm:max-w-[200px]">
            {song?.artist || "Select a song"}
          </p>
        </div>

        <div className="flex gap-4 items-center ml-auto mr-2">
          <div className="relative" ref={volumeControlRef}>
            {/* Volume Icon */}
            <button
              type="button"
              className="flex items-center justify-center focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // Use setTimeout to prevent immediate event propagation issues
                setTimeout(() => {
                  setShowVolumeControl(true);
                }, 10);
              }}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="size-6 text-neutral-400" />
              ) : volume < 0.5 ? (
                <SpeakerOutlineIcon className="size-6 text-[#1DB954]" />
              ) : (
                <SpeakerWaveIcon className="size-6 text-[#1DB954]" />
              )}
            </button>

            {/* Volume Control Modal */}
            {showVolumeControl && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 m-0 p-0 w-full h-full"
                onClick={(e) => {
                  // Only close if clicking the backdrop, not on any child elements
                  if (e.target === e.currentTarget) {
                    setShowVolumeControl(false);
                  }
                }}
                onKeyDown={(e) =>
                  e.key === "Escape" && setShowVolumeControl(false)
                }
                aria-label="Volume controls"
              >
                <div
                  className="bg-neutral-800 rounded-lg shadow-lg p-4 w-72 mx-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-medium">
                      Volume: {Math.round(volumePercentage)}%
                    </span>
                    <button
                      type="button"
                      className="text-white/80 hover:text-white p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setShowVolumeControl(false);
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    {isMuted ? (
                      <SpeakerXMarkIcon className="size-6 text-neutral-400" />
                    ) : volume < 0.3 ? (
                      <SpeakerOutlineIcon className="size-6 text-[#1DB954]" />
                    ) : (
                      <SpeakerWaveIcon className="size-6 text-[#1DB954]" />
                    )}
                    <input
                      type="range"
                      onChange={handleVolumeChange}
                      min="0"
                      max="100"
                      step="1"
                      value={volumePercentage}
                      className="w-full h-8 cursor-pointer rounded-full appearance-none bg-neutral-700 mobile-volume-slider"
                      style={volumeStyle}
                      aria-label="Volume"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(volumePercentage)}
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="bg-neutral-700 text-white py-2 px-4 rounded"
                      onClick={handleMuteToggle}
                    >
                      {isMuted ? "Unmute" : "Mute"}
                    </button>
                    <button
                      type="button"
                      className="bg-[#1DB954] text-white py-2 px-4 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setShowVolumeControl(false);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Play/Pause Button */}
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
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration || 100}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={formatTime(currentTime)}
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
          <span className="min-w-[30px] text-right">
            {formatTime(duration)}
          </span>
        </div>
      )}
    </div>
  );
}
