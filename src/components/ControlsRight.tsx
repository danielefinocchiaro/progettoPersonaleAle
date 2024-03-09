import {
  ArrowTopRightOnSquareIcon,
  ArrowsPointingInIcon,
  Bars4Icon,
  ChevronUpDownIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
export default function ControlsRigth() {
  const [isClickedPc, setIsClickedPc] = useState(false);
  const [isClickedMic, setIsClickedMic] = useState(false);
  const [isClickedBars, setIsClickedBars] = useState(false);
  const [isClickedPhone, setIsClickedPhone] = useState(false);
  const [isClickedWave, setIsClickedWave] = useState(false);
  const [green, setGreen] = useState("");

  return (
    <div className="text-neutral-400 flex gap-2 items-center">
      <div className="flex flex-col items-center relative">
        <ComputerDesktopIcon
          onClick={() => setIsClickedPc(!isClickedPc)}
          className={` ${
            isClickedPc ? "text-green-500" : "text-white hover:text-white"
          }  w-5 transform duration-200 hover:cursor-pointer`}
        />
        {isClickedPc && (
          <div className="text-green-500 absolute top-3 right-2 font-bold">
            .
          </div>
        )}
      </div>

      <div className="flex flex-col items-center relative">
        <MicrophoneIcon
          onClick={() => {
            setIsClickedMic(!isClickedMic);
            setIsClickedBars(false);
          }}
          className={` ${
            isClickedMic ? "text-green-500" : "text-white hover:text-white"
          }  w-5 transform duration-200 hover:cursor-pointer`}
        />
        {isClickedMic && (
          <div className="text-green-500 absolute top-3 right-2 font-bold">
            .
          </div>
        )}
      </div>
      <div className="flex flex-col items-center relative">
        <Bars4Icon
          onClick={() => {
            setIsClickedBars(!isClickedBars);
            setIsClickedMic(false);
          }}
          className={` ${
            isClickedBars ? "text-green-500" : "text-white hover:text-white"
          }  w-5 transform duration-200 hover:cursor-pointer`}
        />
        {isClickedBars && (
          <div className="text-green-500 absolute top-3 right-2 font-bold">
            .
          </div>
        )}
      </div>
      <div className="flex flex-col items-center relative">
        <DevicePhoneMobileIcon
          onClick={() => {
            setIsClickedPhone(!isClickedPhone);
            setIsClickedMic(false);
            setIsClickedPc(false);
          }}
          className={` ${
            isClickedPhone ? "text-green-500" : "text-white hover:text-white"
          }  w-5 transform duration-200 hover:cursor-pointer`}
        />
        {isClickedPhone && (
          <div className="text-green-500 absolute top-3 right-2 font-bold">
            .
          </div>
        )}
      </div>
      <SpeakerWaveIcon
        onClick={() => setGreen("wave")}
        className={` ${
          green === "wave" ? "text-green-500" : "text-white hover:text-white"
        }  w-5 transform duration-200 hover:cursor-pointer`}
      />
      <input
        type="range"
        onClick={() => setGreen("wave")}
        min="0"
        max="100"
        value="0"
        id="range"
        className={` ${
          green === "wave" ? "bg-green-500" : "text-white hover:text-white"
        }  "w-[6rem]" transform duration-200 hover:cursor-pointer`}
      />

      <ArrowsPointingInIcon
        onClick={() => setGreen("arrows")}
        className={` ${
          green === "arrows" ? "text-green-500" : "text-white hover:text-white"
        }  w-5 transform duration-200 hover:cursor-pointer`}
      />

      <ArrowTopRightOnSquareIcon
        onClick={() => setGreen("top")}
        className={` ${
          green === "top" ? "text-green-500" : "text-white hover:text-white"
        }  w-5 transform duration-200 hover:cursor-pointer`}
      />
    </div>
  );
}
