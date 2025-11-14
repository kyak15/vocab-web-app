import { SavedBook, SavedWord } from "@/app/types/types";

import SavedBookHeader from "../../molecules/SavedBookHeader";
import WordsGrid from "../../molecules/WordsGrid";

type BookOrganismProps = {
  book: SavedBook;
  words: SavedWord[];
};

export default function BookOrganism({ book, words }: BookOrganismProps) {
  return (
    <div className="min-h-dvh w-full bg-gray-700 flex flex-col items-center">
      <SavedBookHeader
        title={book.title}
        thumbnail={book.thumbnail}
        author={book.author}
        words={words}
        word_count={book.word_count}
      />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <WordsGrid displayWords={words} />
      </div>
    </div>
  );
}
