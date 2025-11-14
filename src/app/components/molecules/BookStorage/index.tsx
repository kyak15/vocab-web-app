"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseServer";
import BookCard from "../../atoms/BookCard";
import { SavedBook } from "@/app/types/types";
import PageTrackerBookStorage from "../PageTrackerBookStorage";
import { getUserBooks } from "@/app/api/book/book";

export default function BookStorage() {
  const [data, setData] = useState<SavedBook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    async function getBooks() {
      const req = await getUserBooks();
      if (req.success) {
        setData(req.data);
      }
    }
    getBooks();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col h-full px-4 gap-y-12">
        {data.slice(pageNumber, pageNumber + 3).map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
      <PageTrackerBookStorage
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        data={data}
      />
    </div>
  );
}
