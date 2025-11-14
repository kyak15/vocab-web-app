import { SavedWord } from "@/app/types/types";
import PartOfSpeechPill from "../../atoms/PartOfSpeechPill";
import WordHeader from "../../atoms/WordHeader";
import SavedWordCard from "../SavedWordCard";

type WordsGridProps = {
  displayWords: SavedWord[];
};

export default function WordsGrid({ displayWords }: WordsGridProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      style={{ gridAutoRows: "1fr" }}
    >
      {displayWords.map((word) => (
        <SavedWordCard word={word} key={word.id} />
      ))}
    </div>
  );
}
