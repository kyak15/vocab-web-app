import { SavedWord } from "@/app/types/types";
import PartOfSpeechPill from "../../atoms/PartOfSpeechPill";
import WordHeader from "../../atoms/WordHeader";
import Button from "../../atoms/Button";
import { useMemo, useState } from "react";
import FlashCardsPageHeader from "../../molecules/FlashcardsPageHeader";
import WordsGrid from "../../molecules/WordsGrid";

type FlashcardsOrganismProps = {
  words: SavedWord[] | null;
};

export default function FlashcardsOrganism({ words }: FlashcardsOrganismProps) {
  const [sortType, setSortType] = useState<"all" | "learned" | "not learned">(
    "all"
  );

  const displayWords = useMemo(() => {
    if (!words || words.length === 0) return [];
    if (sortType === "all") return words;
    return words.filter((word) =>
      sortType === "learned" ? word.is_learned : !word.is_learned
    );
  }, [sortType, words]);

  if (!words || words.length === 0) {
    return (
      <div className="bg-gray-700 min-h-screen flex flex-col items-center justify-center">
        <p className="text-white text-lg">
          No words found. Start adding words to create flashcards!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 min-h-screen w-full">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FlashCardsPageHeader
          length={displayWords.length}
          sortType={sortType}
          setSortType={setSortType}
        />

        <div className="pb-8">
          <WordsGrid displayWords={displayWords} />
        </div>
      </div>
    </div>
  );
}
