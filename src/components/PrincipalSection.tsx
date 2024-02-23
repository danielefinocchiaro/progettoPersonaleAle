import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import library from "../assets/library.json";

export default function PrincipalSection() {
  return (
    <div className="overflow-hidden">
      <SectionOne data={library.artists} />
      <SectionTwo data={library.album} />
      <SectionThree data={library.playlists} />
    </div>
  );
}
