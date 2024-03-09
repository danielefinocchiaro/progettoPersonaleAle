import CardFive from "./CardFive";
import { LibraryData } from "../types";
export default function SectionFive(props: { data: LibraryData[] }) {
  const { data } = props;
  return (
    <div className="flex flex-col bg-[#121212] px-6 py-4 ml-4 rounded-b-md">
      <h2 className="text-white font-semibold text-left text-3xl pt-5 gap-3 my-1 items-center hover:underline ml-2">
        Continua ad ascoltare
      </h2>
      <div className="flex-row flex overflow-x-auto ">
        {data.map((continues) => {
          return <CardFive continues={continues} />;
        })}
      </div>
    </div>
  );
}
