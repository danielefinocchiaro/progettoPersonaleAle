import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useAudio } from "~/use-audio";

export default function ControlsRigth() {
  const { volume, setVolume } = useAudio();

  // Track whether audio is muted and the previous volume before muting
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);

  // Handle mute/unmute toggle
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

  // Calculate volume percentage for styling
  const volumePercentage = volume * 100;

  // Create the gradient style for the volume slider
  const volumeStyle = {
    background: `linear-gradient(to right, #1DB954 ${volumePercentage}%, #444 ${volumePercentage}%)`,
  };

  return (
    <div className="text-neutral-400 flex gap-2 items-center">
      {isMuted ? (
        <SpeakerXMarkIcon
          onClick={handleMuteToggle}
          className="w-5 text-neutral-400 transform duration-200 hover:cursor-pointer hover:text-white"
        />
      ) : (
        <SpeakerWaveIcon
          onClick={handleMuteToggle}
          className="w-5 text-[#1DB954] transform duration-200 hover:cursor-pointer"
        />
      )}
      <input
        type="range"
        onChange={(e) => setVolume(Number(e.target.value) / 100)}
        min="0"
        max="100"
        value={volumePercentage}
        className="w-24 transform duration-200 hover:cursor-pointer"
        style={volumeStyle}
      />
    </div>
  );
}
