import CardThree from "./CardThree";
import { LibraryData } from "../types";
export default function SectionThree(props: { data: LibraryData[] }) {
  const { data } = props;
  return (
    <div className="flex flex-col">
      <h2 className="text-white font-semibold text-left text-3xl pt-5 ml-10 gap-3 my-1 items-center hover:underline">
        {" "}
        Creati per te{" "}
      </h2>
      <div className="flex-row flex justify-around overflow-x-auto ">
        {data.map((playlist) => {
          return <CardThree playlist={playlist} />;
        })}
      </div>
    </div>
  );
}
