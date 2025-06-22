import type { LibraryData } from "./types";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";

const SongContext = createContext<{
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  playingSong: LibraryData | null;
  setPlayingSong: (song: LibraryData | null) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
} | null>(null);

export const SongProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingSong, setPlayingSong] = useState<LibraryData | null>(null);
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <SongContext.Provider
      value={{
        audioRef,
        playingSong,
        setPlayingSong,
        volume,
        setVolume,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(SongContext);
  if (!context)
    throw new Error("useAudio must be used within a SongContext.Provider");

  const {
    audioRef,
    playingSong,
    setPlayingSong,
    volume,
    setVolume,
    isPlaying,
    setIsPlaying,
  } = context;

  const play = (song: LibraryData) => {
    console.log("playing");

    // If it's the same song that's already loaded, toggle play/pause
    if (playingSong && playingSong.id === song.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    // Clear previous audio if exists
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Set up new audio
    setPlayingSong(song);
    audioRef.current = new Audio(song.audio);
    audioRef.current.volume = volume;

    // Set up ended event
    audioRef.current.onended = () => {
      setPlayingSong(null);
      setIsPlaying(false);
    };

    // Play the audio
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Playback error:", error);
        setIsPlaying(false);
      });
  };

  const pause = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resume = () => {
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => console.error("Resume error:", error));
  };

  const clear = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlayingSong(null);
    setIsPlaying(false);
    audioRef.current = null;
  };

  return {
    song: playingSong,
    audioRef,
    isPlaying,
    volume,
    setVolume,
    play,
    pause,
    resume,
    clear,
  };
};
