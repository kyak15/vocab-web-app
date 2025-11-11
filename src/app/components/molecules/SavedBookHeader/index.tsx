import { SavedWord } from "@/app/types/types";
import BookImage from "../../atoms/BookImage";
import ProgressBar from "../../atoms/ProgressBar";

type SavedBookHeaderProps = {
  title: string;
  thumbnail: string;
  author: string;
  word_count: number;
  words: SavedWord[];
};

export default function SavedBookHeader({
  title,
  thumbnail,
  author,
  word_count,
  words,
}: SavedBookHeaderProps) {
  return (
    <div className="flex flex-col items-center py-6">
      <BookImage size={"xl"} thumbnail={thumbnail} />
      <p className="pt-4 lg:text-3xl">{title}</p>
      <p className="pb-5 lg:text-lg">{author}</p>
      <ProgressBar word_count={word_count} words={words} />
    </div>
  );
}
