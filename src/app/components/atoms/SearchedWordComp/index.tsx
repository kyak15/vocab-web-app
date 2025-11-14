"use client";

import { useState } from "react";
import WordHeader from "../WordHeader";
import PartOfSpeechPill from "../PartOfSpeechPill";
import { addWord } from "@/app/api/word/word";
import { DictionaryResponse } from "@/app/types/types";

type SelectedPayload = {
  word: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  audioUrl?: string;
} | null;

export default function SearchedWordComp({
  userWord,
}: {
  userWord: DictionaryResponse | null;
}) {
  const [selected, setSelected] = useState<SelectedPayload>(null);

  const handlePick = (args: {
    partOfSpeech: string;
    definition: string;
    example?: string;
  }) => {
    if (!userWord) return; // guard against null
    const audioUrl = userWord.phonetics?.find((p) => p.audio)?.audio;
    setSelected({
      word: userWord.word,
      partOfSpeech: args.partOfSpeech,
      definition: args.definition,
      example: args.example,
      audioUrl: audioUrl,
    });
  };

  const handleSubmit = async () => {
    if (selected) await addWord(selected);
  };

  if (userWord === null) {
    return <div>Failed to find word</div>;
  }

  const audioUrl = userWord.phonetics?.find((p) => p.audio)?.audio;

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        <WordHeader word={userWord.word} audioUrl={audioUrl} />
      </div>

      <div className="border-b border-gray-200" />

      <div className="flex-1 overflow-y-auto px-3 sm:px-4">
        {userWord.meanings.map((item, i: number) => (
          <section key={i} className="py-4 sm:py-5">
            <div className="w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/6 mb-2">
              <PartOfSpeechPill pos={item.partOfSpeech} />
            </div>

            <div className="divide-y divide-gray-200">
              {item.definitions.map((def, j) => {
                const isSelected =
                  selected?.definition === def.definition &&
                  selected?.partOfSpeech === item.partOfSpeech;

                return (
                  <button
                    type="button"
                    key={`${i}-${j}`}
                    onClick={() =>
                      handlePick({
                        partOfSpeech: item.partOfSpeech,
                        definition: def.definition,
                        example: def.example,
                      })
                    }
                    className={[
                      "w-full text-left px-2 sm:px-3 py-3 sm:py-4",
                      "rounded-md",
                      "transition",
                      "md:hover:bg-blue-50",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      isSelected
                        ? "bg-blue-50 border border-blue-200"
                        : "border border-transparent",
                    ].join(" ")}
                  >
                    <p className="font-semibold sm:font-bold text-sm sm:text-base">
                      {j + 1}. {def.definition}
                    </p>
                    {def.example && (
                      <p className="italic pt-2 text-sm sm:text-[0.95rem] text-gray-700">
                        {def.example}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="sticky bottom-0 border-t border-gray-200 bg-white p-3 sm:p-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs sm:text-sm text-gray-600 min-h-6 truncate">
            {selected ? (
              <>
                <span className="font-semibold">{selected.word}</span> ·{" "}
                {selected.partOfSpeech} · “
                <span className="italic">{selected.definition}</span>”
              </>
            ) : (
              "Select a definition to save"
            )}
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className={[
                "w-full sm:w-auto px-4 py-2 rounded-md font-semibold",
                selected
                  ? "bg-blue-600 text-white md:hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed",
              ].join(" ")}
            >
              Save selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
