import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

export default function Player() {
  const sliderRef = useRef();

  const [progress, setProgress] = useState<string>("15");
  const [arrows, setArrows] = useState(false);
  const [arrowss, setArrowss] = useState(false);
  return (
    <div className="flex flex-col-reverse items-center text-neutral-800 font-semibold w-1/3">
      <div className=" gap-2 flex items-center text-neutral-400">
        <span> 0:35 </span>
        <input
          type="range"
          onChange={(e) => setProgress(e.target.value)}
          min="0"
          max="100"
          value={progress}
          id="range"
          className={`w-96 bg-[linear-gradient(to right, #f50 10%, #ccc 20%)]`}
        />
        <span> 2:48 </span>
      </div>
      <div className="text-neutral-400 h-48 w-48 flex gap-3 mt-2 ">
        <div className="flex flex-col items-center relative">
          <ArrowsRightLeftIcon
            onClick={() => {
              setArrows(!arrows);
            }}
            className={` ${
              arrows ? "text-green-500" : "text-neutral-400 hover:text-white"
            } w-8 transform duration-200 hover:cursor-pointer`}
          />
          {arrows && (
            <div className="text-green-500 absolute top-5 right-4 font-bold">
              .
            </div>
          )}
        </div>

        <ChevronLeftIcon className="hover:text-white" />
        <PlayCircleIcon className="hover:text-white" />
        <ChevronRightIcon className="hover:text-white" />

        <div className="flex flex-col items-center relative">
          <ArrowPathRoundedSquareIcon
            onClick={() => {
              setArrowss(!arrowss);
            }}
            className={` ${
              arrowss ? "text-green-500" : "text-neutral-400 hover:text-white "
            } w-8 transform duration-200 hover:cursor-pointer`}
          />
          {arrowss && (
            <div className="text-green-500 absolute top-5 right-4 font-bold">
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
