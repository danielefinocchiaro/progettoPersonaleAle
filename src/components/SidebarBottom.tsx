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
} from "@heroicons/react/24/outline";
import library from "../assets/library.json";

import { useState } from "react";
import DropDown from "./DropDown";
import DropDownTwo from "./DropDownTwo";
import LibraryCol from "./LibraryCol";
import New from "./New";

export default function SidebarBottom() {
  const [recent, setRecent] = useState(false);
  const [add, setAdd] = useState(false);
  const [alf, setAlf] = useState(false);
  const [aut, setAut] = useState(false);
  const [comp, setComp] = useState(false);
  const [el, setEl] = useState(false);
  const [gri, setGri] = useState(false);

  return (
    <div className="flex flex-col py-4 bg-[#121212] w-96 rounded-t-md rounded-b-md mt-2 ml-1 h-[68vh]">
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
        <DropDownTwo
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
              onClick={() => {
                setRecent(!recent);
                setAdd(false);
                setAut(false);
                setAlf(false);
              }}
              className={` ${
                recent
                  ? "text-green-500 flex-row-reverse justify-between"
                  : "text-gray-100  "
              }  gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
              href="#"
            >
              {recent && <CheckIcon className="h-5" />}
              Recenti
            </a>
          </div>
          <div>
            <a
              onClick={() => {
                setAdd(!add);
                setRecent(false);
                setAut(false);
                setAlf(false);
              }}
              className={` ${
                add
                  ? "text-green-500 flex-row-reverse justify-between "
                  : "text-gray-100  "
              }  gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
              href="#"
            >
              {add && <CheckIcon className="h-5" />}
              Aggiunti
            </a>
          </div>
          <div>
            <a
              onClick={() => {
                setAlf(!alf);
                setRecent(false);
                setAdd(false);
                setAut(false);
              }}
              className={` ${
                alf
                  ? "text-green-500 flex-row-reverse justify-between  "
                  : "text-gray-100  "
              }  gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
              href="#"
            >
              {alf && <CheckIcon className="h-5" />}
              Alfabetico
            </a>
          </div>
          <div>
            <a
              onClick={() => {
                setAut(!aut);
                setRecent(false);
                setAdd(false);
                setAlf(false);
              }}
              className={` ${
                aut
                  ? "text-green-500 flex-row-reverse justify-between "
                  : "text-gray-100  "
              }  gap-x-2 px-4 py-2 text-sm flex hover:bg-[#3E3E3E] hover:rounded-sm mx-3 hover:cursor-pointer`}
              href="#"
            >
              {aut && <CheckIcon className="h-5" />}
              Autore
            </a>
          </div>
          <hr className="w-40 text-gray-100 m-2"></hr>
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
              onClick={() => {
                setComp(!comp);
                setEl(false);
                setGri(false);
              }}
              className={` ${
                comp ? "text-green-500 justify-between " : "text-gray-100  "
              }  text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E]`}
              href="#"
            >
              {comp && <CheckIcon className="h-5 order-last" />}
              <Bars3Icon className="h-5 order-first" />
              Compatta
            </a>
          </div>
          <div>
            <a
              onClick={() => {
                setEl(!el);
                setComp(false);
                setGri(false);
              }}
              className={` ${
                el ? "text-green-500 justify-between " : "text-gray-100  "
              }  text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E]`}
              href="#"
            >
              {el && <CheckIcon className="h-5 order-last" />}
              <ListBulletIcon className="h-5 order-first" />
              Elenco
            </a>
          </div>
          <div>
            <a
              onClick={() => {
                setGri(!gri);
                setEl(false);
                setComp(false);
              }}
              className={` ${
                gri ? "text-green-500 justify-between " : "text-gray-100  "
              }  text-gray-100 gap-x-2 px-4 py-2 hover:rounded-sm mx-3 text-sm flex hover:bg-[#3E3E3E] z-30`}
              href="#"
            >
              {gri && <CheckIcon className="h-5 order-last" />}
              <Squares2X2Icon className="h-5 oreder-first" />
              Griglia
            </a>
          </div>
        </DropDownTwo>
      </div>
      <New />
    </div>
  );
}
//•
