import { SavedWord } from "@/app/types/types";
import PartOfSpeechPill from "../../atoms/PartOfSpeechPill";
import WordHeader from "../../atoms/WordHeader";

type SavedWordCardProps = {
  word: SavedWord;
};

export default function SavedWordCard({ word }: SavedWordCardProps) {
  return (
    <div
      key={word.id}
      className="flex flex-col h-full bg-white border rounded-lg p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-3 flex-shrink-0">
        <WordHeader word={word.word} isLearned={word.is_learned} />
        {word.part_of_speech && <PartOfSpeechPill pos={word.part_of_speech} />}
      </div>
      <p className="text-sm md:text-base text-gray-700 break-words leading-relaxed flex-grow min-h-0">
        {word.definition}
      </p>
      {word.phonetic && (
        <p className="text-xs text-gray-500 mt-2 italic flex-shrink-0">
          {word.phonetic}
        </p>
      )}
    </div>
  );
}
