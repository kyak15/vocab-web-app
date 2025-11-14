import { SavedWord } from "@/app/types/types";
import PartOfSpeechPill from "../../atoms/PartOfSpeechPill";
import WordHeader from "../../atoms/WordHeader";
import { useState } from "react";

type SavedWordCardProps = {
  word: SavedWord;
};

export default function SavedWordCard({ word }: SavedWordCardProps) {
  const [displayType, setDisplayType] = useState<"viewing" | "editing">(
    "viewing"
  );

  return (
    <div
      key={word.id}
      className="flex flex-col h-full bg-white border rounded-lg p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="mb-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <WordHeader word={word.word} isLearned={word.is_learned} />
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="More options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
        {word.part_of_speech && (
          <div className="mt-2 w-fit">
            <PartOfSpeechPill pos={word.part_of_speech} />
          </div>
        )}
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
