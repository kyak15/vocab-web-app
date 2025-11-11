import { SavedBook, SavedWord } from "@/app/types/types";

import SavedWordCard from "../../molecules/SavedWordCard";
import SavedBookHeader from "../../molecules/SavedBookHeader";

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

      <div className="flex flex-col items-start mx-12 h-full ">
        <SavedWordCard words={words} />
      </div>
    </div>
  );
}
