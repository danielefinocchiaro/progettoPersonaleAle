import { HeartIcon } from "@heroicons/react/24/outline";
import Player from "./Player";

export default function PlayerLeft() {
  return (
    <div className=" flex-row flex items-center gap-x-2 w-1/4">
      <img
        src="https://i.scdn.co/image/ab67616d0000b273da1ab5d4bdae792d8ec0b5fc"
        className="h-14 w-14 rounded-[4px] mx-2 mt-3"
      />
      <div className="flex flex-col text-sm items-start justify-center">
        <p className="text-white hover:underline"> cosa conta davvero </p>
        <p className="text-neutral-400 text-xs hover:underline hover:text-white">
          {" "}
          Nayt{" "}
        </p>
      </div>
      <HeartIcon className="h-5 w-5 text-neutral-400 m-3 hover:scale-105 hover:text-white" />
    </div>
  );
}
