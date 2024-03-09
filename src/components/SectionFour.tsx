import CardFour from "./CardFour";
import { LibraryData } from "../types";
export default function SectionFour(props: { data: LibraryData[] }) {
  const { data } = props;
  return (
    <div className="flex flex-col bg-[#121212] px-6 py-4 ml-4 rounded-b-md">
      <h2 className="text-white font-semibold text-left text-3xl pt-5 gap-3 my-1 items-center hover:underline ml-2">
        Creato per Danilo
      </h2>
      <div className="flex-row flex overflow-x-auto ">
        {data.map((danilo) => {
          return <CardFour danilo={danilo} />;
        })}
      </div>
    </div>
  );
}
