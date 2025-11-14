"use client";

import { getSearchedWord } from "@/app/api/word/word";
import { Dispatch, SetStateAction, useState } from "react";
import SearchedBookComp from "../../atoms/SearchedBookComp";
import SearchedWordComp from "../../atoms/SearchedWordComp";
import {
  SearchedBook,
  SearchedWord as SearchedWordType,
} from "@/app/types/types";
import { getSearchedBooks } from "@/app/api/book/book";

type SearchModalProps = { setOpenSearch: Dispatch<SetStateAction<boolean>> };

export default function SearchModal({ setOpenSearch }: SearchModalProps) {
  const [searchType, setSearchType] = useState<"book" | "word">("book");
  const [searchValue, setSearchValue] = useState("");
  const [bookResults, setBookResults] = useState<SearchedBook[]>([]);
  const [wordResult, setWordResult] = useState<SearchedWordType | null>(null);

  async function handleSearch() {
    if (searchType === "book") {
      const data = await getSearchedBooks(searchValue);
      setBookResults(data ?? []);
      setWordResult(null); // clear tab data
    } else {
      console.log(searchValue);
      const data = await getSearchedWord(searchValue);
      setWordResult(data ?? null);
      setBookResults([]); // clear tab data
    }
  }

  const searchedItems =
    searchType === "book" ? (
      bookResults.length ? (
        bookResults.map((item) => <SearchedBookComp key={item.id} {...item} />)
      ) : (
        <div className="text-gray-500">Search books…</div>
      )
    ) : wordResult ? (
      <SearchedWordComp userWord={wordResult} />
    ) : (
      <div className="text-gray-500">Search a word…</div>
    );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black">
      <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md h-[75%] flex flex-col p-4">
        <div className="flex items-center gap-3 w-full mb-4">
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded-md text-sm transition ${
                searchType === "book"
                  ? "bg-[#104152] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSearchType("book")}
            >
              Book
            </button>

            <button
              className={`px-3 py-1 rounded-md text-sm transition ${
                searchType === "word"
                  ? "bg-[#104152] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSearchType("word")}
            >
              Word
            </button>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder={`Search ${searchType}...`}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 
                       focus:outline-none focus:ring-2 focus:ring-[#104152]"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
            onClick={() => setOpenSearch(false)}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1 transition"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto grow pr-1">
          {searchedItems}
        </div>
      </div>
    </div>
  );
}
