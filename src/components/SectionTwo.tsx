import CardTwo from "./CardTwo";
import type { LibraryData } from "../types";
export default function SectionTwo(props: { data: LibraryData[] }) {
  const { data } = props;
  return (
    <div className="flex flex-col bg-[#121212] px-6 py-4 ml-4 ">
      <h2 className="text-white font-semibold text-left text-3xl pt-5 gap-3 my-1 items-center hover:underline ml-2">
        Album più popolari
      </h2>
      <div className="flex-row flex overflow-x-auto gap-1">
        {data.map((popular) => {
          return <CardTwo popular={popular} />;
        })}
      </div>
    </div>
  );
}
