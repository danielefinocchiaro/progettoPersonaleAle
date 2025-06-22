import Section from "./Section";
import Card from "./Card";
import SectionRow from "./SectionRow";
import library from "../assets/library.json";
import libraryTwo from "../assets/libraryTwo.json";
import { useEffect, useState } from "react";
import type { LibraryData } from "../types";

export default function PrincipalSection() {
  const [greeting, setGreeting] = useState<string>("Benvenuto");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 13) {
      setGreeting("Buongiorno");
    } else if (currentHour >= 13 && currentHour < 19) {
      setGreeting("Buon pomeriggio");
    } else if (currentHour >= 19 && currentHour < 22) {
      setGreeting("Buonasera");
    } else {
      setGreeting("Buonanotte");
    }
  }, []);

  return (
    <div className="overflow-y-scroll h-[85vh] bg-black">
      {/* Welcome Section */}
      <Section
        title={greeting}
        data={library.artists}
        rounded="top"
        className="pt-4"
      >
        {(item: LibraryData) => <SectionRow key={item.id} artist={item} />}
      </Section>

      {/* Continue Listening Section - with audio functionality */}
      <Section title="Continua ad ascoltare" data={libraryTwo.continues}>
        {(item: LibraryData) => (
          <Card key={item.id} item={item} withAudio={true} />
        )}
      </Section>

      {/* Past Section */}
      <Section title="Un salto nel passato" data={libraryTwo.past}>
        {(item: LibraryData) => <Card key={item.id} item={item} />}
      </Section>

      {/* Popular Albums Section */}
      <Section title="Album più popolari" data={libraryTwo.popular}>
        {(item: LibraryData) => <Card key={item.id} item={item} />}
      </Section>

      {/* Created for User Section */}
      <Section
        title="Creato per Alessia"
        data={libraryTwo.danilo}
        rounded="bottom"
      >
        {(item: LibraryData) => <Card key={item.id} item={item} />}
      </Section>
    </div>
  );
}
