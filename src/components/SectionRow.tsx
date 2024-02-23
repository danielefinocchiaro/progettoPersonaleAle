import { LibraryData } from "../types";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
export default function SectionRow(props: { artist: LibraryData }) {
  const { artist } = props;
  return (
    <div className="h-[3.0rem] w-[13.6rem] flex flex-row m-1 text-white bg-neutral-800 hover:bg-[#3E3E3E] rounded-sm gap-3 my-1 items-center group hover:cursor-pointer">
      <PlayCircleIcon className="h-10 w-10 opacity-0 group-hover:opacity-100 order-last ml-auto mr-3 justify-items-end" />
      <div className="h-12 w-12  justify-around">
        <img src={artist.link} className="h-full w-full rounded-sm" />
      </div>
      <div className="flex flex-col font-medium">
        <div>{artist.name}</div>
      </div>
    </div>
  );
}
