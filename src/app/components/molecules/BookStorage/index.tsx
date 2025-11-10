"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseServer";
import BookCard from "../../atoms/BookCard";
import { SavedBook } from "@/app/types/types";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

export default function BookStorage() {
  const [data, setData] = useState<SavedBook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    supabase
      .from("books")
      .select("*")
      .order("createdAt", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setData(data ?? []);
      });
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col h-full px-12 gap-y-12">
        {data.slice(pageNumber, pageNumber + 3).map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
      <div className="sticky bottom-0 py-3 flex flex-row justify-center">
        {data.length >= 4 && (
          <div className="flex flex-row items-center justify-center">
            <FaChevronLeft
              onClick={() => pageNumber !== 0 && setPageNumber(pageNumber - 3)}
              className="cursor-pointer"
            />

            {Array.from({ length: Math.ceil(data.length / 3) }).map((_, i) => (
              <GoDotFill
                key={i}
                fill={pageNumber / 3 === i ? "red" : "white"}
              />
            ))}

            <FaChevronRight
              onClick={() =>
                pageNumber + 3 < data.length && setPageNumber(pageNumber + 3)
              }
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
