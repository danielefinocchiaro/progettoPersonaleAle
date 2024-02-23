import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { LibraryData } from "../types";
export default function CardThree(props: { playlist: LibraryData }) {
  const { playlist } = props;
  return (
    <div className="h-[18.5rem] min-w-52 flex flex-col m-1 text-white bg-neutral-800 hover:bg-[#3E3E3E] rounded-lg gap-3 my-1 items-start p-4 group hover:cursor-pointer">
      <div className="flex justify-around relative">
        <img src={playlist.link} className=" rounded-md" />
        <PlayCircleIcon className="h-16 w-16 opacity-0 absolute bottom-0 right-0 group-hover:opacity-100 order-last p-1 justify-items-end" />
      </div>
      <div className="flex flex-col font-medium">
        <div>{playlist.name}</div>
        <div className="text-neutral-400">{playlist.artist}</div>
      </div>
    </div>
  );
}
