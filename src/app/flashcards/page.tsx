"use client";
import { useEffect, useState } from "react";
import FlashcardsOrganism from "../components/organisms/FlashcardsOrganism";
import { SavedWord } from "../types/types";
import { getAllWords } from "../api/word/word";

export default function Flashcards() {
  const [words, setWords] = useState<SavedWord[] | null>([]);

  useEffect(() => {
    async function fetchWords() {
      const data = await getAllWords();
      if (data.success) {
        setWords(data.data);
      } else {
        setWords(null);
      }
    }
    fetchWords();
  }, []);

  return <FlashcardsOrganism words={words} />;
}
