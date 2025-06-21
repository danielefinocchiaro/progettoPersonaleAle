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
} | null>(null);

export const SongProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingSong, setPlayingSong] = useState<LibraryData | null>(null);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef.current]);

  return (
    <SongContext.Provider
      value={{ audioRef, playingSong, setPlayingSong, volume, setVolume }}
    >
      {playingSong && (
        <audio ref={audioRef} className="absolute hidden">
          <source src={playingSong.audio} type="audio/mpeg" />
          <track kind="captions" src="" label="English captions" />
        </audio>
      )}
      {children}
    </SongContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(SongContext);
  if (!context)
    throw new Error("useAudio must be used within a SongContext.Provider");

  const { audioRef, playingSong, setPlayingSong, volume, setVolume } = context;

  const play = (song: LibraryData) => {
    console.log("playing");
    if (playingSong && playingSong.id === song.id) return;

    setPlayingSong(song);
    audioRef.current = new Audio(song.audio);
    audioRef.current
      .play()
      .catch((error) => console.error("Playback error:", error));

    console.log(audioRef.current.paused);

    audioRef.current.onended = () => {
      setPlayingSong(null);
    };
  };

  const pause = () => {
    console.log("pausing", audioRef.current?.paused); // ma che cazzo
    audioRef.current?.pause();
  };

  const resume = () => {
    if (audioRef.current) audioRef.current.play();
  };

  const clear = () => {
    setPlayingSong(null);
    audioRef.current = null;
  };

  return {
    song: playingSong,
    audioRef,
    isPlaying: !(audioRef.current?.paused ?? true),
    volume,
    setVolume,
    play,
    pause,
    resume,
    clear,
  };
};
