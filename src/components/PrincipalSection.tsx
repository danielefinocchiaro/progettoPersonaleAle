import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import library from "../assets/library.json";
import libraryTwo from "../assets/libraryTwo.json";

export default function PrincipalSection() {
  return (
    <div className="overflow-y-scroll h-[85vh] bg-black ">
      <SectionOne data={library.artists} />
      <SectionFive data={libraryTwo.continues} />
      <SectionThree data={libraryTwo.past} />
      <SectionTwo data={libraryTwo.popular} />
      <SectionFour data={libraryTwo.danilo} />
    </div>
  );
}
