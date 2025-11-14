import { SavedWord } from "@/app/types/types";
import PartOfSpeechPill from "../../atoms/PartOfSpeechPill";
import WordHeader from "../../atoms/WordHeader";

type SavedwordCardProps = {
  words: SavedWord[];
};

export default function SavedWordCard({ words }: SavedwordCardProps) {
  return words.map((word) => (
    <div key={word.id} className="flex flex-col w-full border rounded-md my-4 ">
      <div className="flex justify-between px-2">
        <WordHeader word={word.word} isLearned={word.is_learned} />
        <PartOfSpeechPill pos={word?.part_of_speech} />
      </div>
      <p className="px-4 pt-1 pb-2">{word.definition}</p>
    </div>
  ));
}
