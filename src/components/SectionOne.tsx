import { LibraryData } from "../types";
import SectionRow from "./SectionRow";
import CardRow from "./CardTwo";
import SectionTwo from "./SectionTwo";

export default function SectionOne(props: { data: LibraryData[] }) {
  const { data } = props;
  const oraCorrente = new Date().getHours();
  let saluto;
  if (oraCorrente >= 6 && oraCorrente <= 13) {
    saluto = "Buongiorno";
  } else if (oraCorrente <= 19) {
    saluto = "Buon pomeriggio";
  } else if (oraCorrente <= 22) {
    saluto = "Buonasera";
  } else {
    saluto = "Buonanotte";
  }

  return (
    <div className="bg-[#121212] grow px-6 py-4 ml-4 rounded-t-md">
      <div className="flex flex-row justify-between">
        <h1 className="text-white font-semibold text-left text-3xl pt-10 ml-1">
          {" "}
          {saluto}{" "}
        </h1>
        <img
          src="https://billboard.it/wp-content/uploads/2020/11/Nayt_foto-stampa-819x1024.jpg"
          className="h-10 w-10 rounded-full justify-end items-start flex"
        />
      </div>
      <div className="flex-row flex flex-wrap justify-items-center pt-1">
        {data.map((artist) => {
          return <SectionRow artist={artist} />;
        })}
      </div>
    </div>
  );
}
