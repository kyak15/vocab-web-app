"use client";

import BookOrganism from "@/app/components/organisms/BookOrganism";
import { SavedBook, SavedWord } from "@/app/types/types";
import { getBookById } from "@/app/api/book/book";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWordsFromBook } from "@/app/api/word/word";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  const [book, setBook] = useState<SavedBook | null>(null);
  const [words, setWords] = useState<SavedWord[] | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      const [b, w] = await Promise.all([
        getBookById(bookId),
        getWordsFromBook(bookId),
      ]);
      setBook(b?.data ?? null);
      setWords(w?.data ?? []);
    })();
  }, [id, bookId]);

  if (!book || !words) return null;

  return <BookOrganism book={book} words={words} />;
}
