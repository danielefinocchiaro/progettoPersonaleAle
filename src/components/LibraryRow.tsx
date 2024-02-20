import React from "react";
import library from "../assets/library.json";
import { LibraryData } from "../types";
export default function LibraryRow(props: { data: LibraryData; type: string }) {
  const { data, type } = props;
  if (type === "artist") {
    return (
      <div className="flex flex-row text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 gap-3 items-center">
        <div className="h-12 w-12 ml-2">
          <img src={data.link} className="h-full w-full rounded-full" />
        </div>
        <div className="flex flex-col font-medium">
          <div>{data.name}</div>
          <div className="text-neutral-400"> Artista </div>
        </div>
      </div>
    );
  } else if (type === "album") {
    return (
      <div className="flex flex-row gap-3 text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 items-center">
        <div className="w-12 h-12 ml-2">
          <img src={data.link} className="rounded-sm" />
        </div>
        <div className="flex flex-col font-medium">
          <div>{data.name}</div>
          <div className="text-neutral-400">{`Album • ${data.artist}`}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 gap-3 items-center">
        <div className="w-12 h-12 ml-2">
          <img src={data.link} className="rounded-sm" />
        </div>
        <div className="flex flex-col font-medium">
          <div>{data.name}</div>
          <div className="text-neutral-400">{`Playlist • ${data.artist}`}</div>
        </div>
      </div>
    );
  }
}
