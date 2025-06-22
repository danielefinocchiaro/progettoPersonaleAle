import {
  ArrowRightIcon,
  BookmarkIcon,
  PlusIcon,
  MusicalNoteIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
  Bars3Icon,
  Squares2X2Icon,
  CheckIcon,
  PlayCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import library from "../assets/library.json";

import { useState } from "react";
import DropDown from "./DropDown";
import DropDownTwo from "./DropDownTwo";
import LibraryCol from "./LibraryCol";
import New from "./New";
import { useAudio } from "~/use-audio";
import { useMobile } from "~/use-mobile";
import type { LibraryData } from "../types";

export default function SidebarBottom() {
  const [recent, setRecent] = useState(false);
  const [add, setAdd] = useState(false);
  const [alf, setAlf] = useState(false);
  const [aut, setAut] = useState(false);
  const [comp, setComp] = useState(false);
  const [el, setEl] = useState(false);
  const [gri, setGri] = useState(false);
  const { isPlaying, song, play, pause } = useAudio();
  const isMobile = useMobile();

  // Function to handle playlist play
  const handlePlayPlaylist = (item: LibraryData) => {
    // In a real app, this would play the first song of the playlist or the item itself
    // For simplicity, we'll just play the item directly if it has audio, otherwise use the first artist
    const playableItem = item.audio ? item : library.artists[0];

    if (isPlaying && song?.id === playableItem.id) {
      pause();
    } else {
      play(playableItem);

      // Add haptic feedback for mobile devices if supported
      if (isMobile && navigator.vibrate) {
        navigator.vibrate(5);
      }
    }
  };

  return (
    <div className="flex flex-col py-4 bg-[#121212] w-96 rounded-t-md rounded-b-md mt-2 h-[68vh] overflow-hidden">
      <div className="flex flex-row justify-between px-6">
        <div className="text-neutral-400 hover:text-white flex items-center space-x-4 mb-6">
          <BookmarkIcon className="w-6 h-6" />
          <p className="font-bold"> La tua libreria </p>
        </div>
        <div className="flex gap-4">
          <DropDown
            header={
              <PlusIcon className="w-6 h-6 justify-end flex text-neutral-400 hover:text-white hover:bg-[#222222] hover:rounded-xl" />
            }
          >
            <div>
              <button
                type="button"
                className="w-full text-gray-100 gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E]"
              >
                <MusicalNoteIcon className="h-5" />
                Crea una nuova playlist
              </button>
            </div>
            <div>
              <button
                type="button"
                className="w-full text-gray-100 gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E]"
              >
                <FolderIcon className="h-5" />
                Crea una cartella playlist
              </button>
            </div>
          </DropDown>
          <ArrowRightIcon className="w-6 h-6 text-neutral-400 hover:text-white hover:bg-[#222222] hover:rounded-xl" />
        </div>
      </div>
      <div className="flex flex-row gap-2 px-4 text-white">
        <button
          type="button"
          className="py-1 px-3 rounded-3xl bg-[#232323] hover:bg-neutral-700"
        >
          Playlist
        </button>
        <button
          type="button"
          className="py-1 px-3 bg-[#232323] hover:bg-neutral-700 rounded-3xl"
        >
          Artisti
        </button>
        <button
          type="button"
          className="py-1 px-3 bg-[#232323] hover:bg-neutral-700 rounded-3xl"
        >
          Album
        </button>
      </div>
      <div className="flex flex-row gap-6 px-6 py-4 justify-between ">
        <MagnifyingGlassIcon className="w-6 h-6 text-neutral-400 hover:text-white hover:bg-[#222222] hover:rounded-xl" />
        <DropDownTwo
          header={
            <div className="flex items-center justify-end text-neutral-400 hover:text-white hover:scale-105 gap-1">
              Recenti
              <ListBulletIcon className="w-6 h-6" />
            </div>
          }
        >
          <div>
            <p className="text-gray-100 gap-x-2 px-4 py-2 text-xs font-semibold flex mx-3">
              Ordina per
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setRecent(!recent);
                setAdd(false);
                setAut(false);
                setAlf(false);
              }}
              className={` ${
                recent
                  ? "text-green-500 flex-row-reverse justify-between"
                  : "text-gray-100"
              } w-full gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
            >
              {recent && <CheckIcon className="h-5" />}
              Recenti
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setAdd(!add);
                setRecent(false);
                setAut(false);
                setAlf(false);
              }}
              className={` ${
                add
                  ? "text-green-500 flex-row-reverse justify-between"
                  : "text-gray-100"
              } w-full gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
            >
              {add && <CheckIcon className="h-5" />}
              Aggiunti
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setAlf(!alf);
                setRecent(false);
                setAdd(false);
                setAut(false);
              }}
              className={` ${
                alf
                  ? "text-green-500 flex-row-reverse justify-between"
                  : "text-gray-100"
              } w-full gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
            >
              {alf && <CheckIcon className="h-5" />}
              Alfabetico
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setAut(!aut);
                setRecent(false);
                setAdd(false);
                setAlf(false);
              }}
              className={` ${
                aut
                  ? "text-green-500 flex-row-reverse justify-between"
                  : "text-gray-100"
              } w-full gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
            >
              {aut && <CheckIcon className="h-5" />}
              Autore
            </button>
          </div>
          <hr className="w-40 text-gray-100 m-2" />
          <div>
            <p className="text-gray-100 gap-x-2 px-4 py-2 text-xs font-semibold mx-3 flex">
              Visualizza come
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setComp(!comp);
                setEl(false);
                setGri(false);
              }}
              className={` ${
                comp ? "text-green-500 justify-between" : "text-gray-100"
              } w-full text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E]`}
            >
              {comp && <CheckIcon className="h-5 order-last" />}
              <Bars3Icon className="h-5 order-first" />
              Compatta
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setEl(!el);
                setComp(false);
                setGri(false);
              }}
              className={` ${
                el ? "text-green-500 justify-between" : "text-gray-100"
              } w-full text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E]`}
            >
              {el && <CheckIcon className="h-5 order-last" />}
              <ListBulletIcon className="h-5 order-first" />
              Elenco
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setGri(!gri);
                setEl(false);
                setComp(false);
              }}
              className={` ${
                gri ? "text-green-500 justify-between" : "text-gray-100"
              } w-full text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E] z-30`}
            >
              {gri && <CheckIcon className="h-5 order-last" />}
              <Squares2X2Icon className="h-5 order-first" />
              Griglia
            </button>
          </div>
        </DropDownTwo>
      </div>
      <div className="overflow-y-auto flex-grow">
        <New />
      </div>
    </div>
  );
}
//•
