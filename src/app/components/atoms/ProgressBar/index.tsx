"use client";
import { SavedWord } from "@/app/types/types";

type ProgressBarProps = {
  word_count: number;
  words: SavedWord[];
  height?: number;
};

export default function ProgressBar({
  word_count,
  words,
  height = 10,
}: ProgressBarProps) {
  const learnedWords = words.filter((w) => w.is_learned).length;
  const progress = word_count > 0 ? (learnedWords / word_count) * 100 : 0;

  return (
    <div className="flex flex-col w-full">
      <div
        className="relative w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-sm text-white flex justify-between">
        <span>{learnedWords} learned</span>
        <span>
          {Math.round(progress)}% ({learnedWords}/{word_count})
        </span>
      </div>
    </div>
  );
}
