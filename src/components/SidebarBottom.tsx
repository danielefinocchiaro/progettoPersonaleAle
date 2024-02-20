import React from "react";
import library from "../assets/library.json";
import LibraryCol from "./LibraryCol";
import LibraryRow from "./LibraryRow";
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
} from "@heroicons/react/24/outline";
import DropDown from "./DropDown";
export default function SidebarBottom() {
  return (
    <div className="flex flex-col py-4 bg-[#121212] w-96 rounded-t-md rounded-b-md mt-2 ml-1">
      <div className="flex flex-row  justify-between px-6">
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
              <a
                href="#"
                className=" text-gray-100 gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] "
              >
                <MusicalNoteIcon className="h-5" />
                Crea una nuova playlist
              </a>
            </div>
            <div>
              <a
                href="#"
                className=" text-gray-100 gap-x-2 px-4 py-2 text-sm  flex hover:bg-[#3E3E3E]"
              >
                <FolderIcon className="h-5" />
                Crea una cartella playlist
              </a>
            </div>
          </DropDown>
          <ArrowRightIcon className="w-6 h-6 text-neutral-400 hover:text-white hover:bg-[#222222] hover:rounded-xl" />
        </div>
      </div>
      <div className="flex flex-row gap-2 px-4 text-white">
        <button className="py-1 px-3 rounded-3xl bg-[#232323] hover:bg-neutral-700">
          {" "}
          Playlist{" "}
        </button>
        <button className="py-1 px-3 bg-[#232323] hover:bg-neutral-700 rounded-3xl">
          {" "}
          Artisti{" "}
        </button>
        <button className="py-1 px-3 bg-[#232323] hover:bg-neutral-700 rounded-3xl">
          {" "}
          Album{" "}
        </button>
      </div>
      <div className="flex flex-row gap-6 px-6 py-4 justify-between ">
        <MagnifyingGlassIcon className="w-6 h-6 text-neutral-400 hover:text-white hover:bg-[#222222] hover:rounded-xl" />
        <DropDown
          header={
            <div className="flex items-center justify-end text-neutral-400 hover:text-white hover:scale-105 gap-1">
              Recenti
              <ListBulletIcon className="w-6 h-6 " />
            </div>
          }
        >
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 text-xs font-semibold flex mx-3 "
            >
              Ordina per
            </a>
          </div>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 "
            >
              Recenti
            </a>
          </div>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 text-sm hover:rounded-sm mx-3 flex hover:bg-[#3E3E3E]"
            >
              Aggiunti di recente
            </a>
          </div>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 text-sm hover:rounded-sm mx-3 flex hover:bg-[#3E3E3E]"
            >
              Ordine Alfabetico
            </a>
          </div>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 text-sm hover:rounded-sm mx-3 flex hover:bg-[#3E3E3E]"
            >
              Autore
            </a>
          </div>
          <hr className="w-full text-gray-100 ml-4"></hr>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 text-xs font-semibold mx-3 flex "
            >
              Visualizza come
            </a>
          </div>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E] "
            >
              <Bars3Icon className="h-5" />
              Compatta
            </a>
          </div>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2  hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E] "
            >
              <ListBulletIcon className="h-5" />
              Elenco
            </a>
          </div>
          <div>
            <a
              href="#"
              className=" text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E] "
            >
              <Squares2X2Icon className="h-5" />
              Griglia
            </a>
          </div>
        </DropDown>
      </div>

      <div>
        <LibraryCol />
      </div>
    </div>
  );
}
//•
