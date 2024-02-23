import CardTwo from "./CardTwo";
import { LibraryData } from "../types";
export default function SectionTwo(props: { data: LibraryData[] }) {
  const { data } = props;
  return (
    <div className="flex flex-col">
      <h2 className="text-white font-semibold text-left text-3xl pt-5 ml-10 gap-3 my-1 items-center hover:underline">
        {" "}
        Album più popolari{" "}
      </h2>
      <div className="flex-row flex justify-around overflow-x-auto ">
        {data.map((album) => {
          return <CardTwo album={album} />;
        })}
      </div>
    </div>
  );
}
