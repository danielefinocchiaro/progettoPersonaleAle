import { useRef, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import type { LibraryData } from "../types";

let activeAudio: HTMLAudioElement | null = null; // Variabile globale per tracciare l'audio attivo

export default function CardFive(props: { continues: LibraryData }) {
  const { continues } = props;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Stato per tracciare se l'audio è in riproduzione

  const handlePlayPause = () => {
    if (audioRef.current) {
      // Se c'è un altro audio che sta suonando, fermalo
      if (activeAudio && activeAudio !== audioRef.current) {
        activeAudio.pause(); // Ferma l'audio attivo
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((error) => console.error("Errore riproduzione:", error));
      }

      // Aggiorna il riferimento dell'audio attivo
      activeAudio = audioRef.current;
      setIsPlaying(!isPlaying); // Cambia lo stato
    }
  };

  return (
    <div className="h-[18.5rem] min-w-52 flex flex-col m-1 mr-4 text-white bg-neutral-800 hover:bg-[#3E3E3E] rounded-lg gap-3 my-1 items-start p-4 group hover:cursor-pointer">
      <div className="flex justify-around relative">
        {/* Audio con il file dell'oggetto continues */}
        <audio ref={audioRef}>
          <source src={continues.audio} type="audio/mpeg" />
        </audio>

        {/* Immagine */}
        <img src={continues.link} className="rounded-md" />

        {/* Icona Play/Pausa */}
        <PlayCircleIcon
          className="h-16 w-16 opacity-0 absolute bottom-0 right-0 group-hover:opacity-100 order-last p-1 justify-items-end cursor-pointer"
          onClick={handlePlayPause}
        />
      </div>

      {/* Nome e Artista */}
      <div className="flex flex-col font-medium">
        <div>{continues.name}</div>
        <div className="text-neutral-400">{continues.artist}</div>
      </div>
    </div>
  );
}
