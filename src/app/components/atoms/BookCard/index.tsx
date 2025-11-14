"use client";
import { SavedBook } from "@/app/types/types";
import BookImage from "../BookImage";
import Link from "next/link";

export default function BookCard({
  id,
  createdAt,
  title,
  author,
  thumbnail,
  word_count,
  book_id,
  currently_reading,
}: SavedBook) {
  const fixedDate = new Date(createdAt).toUTCString().slice(5, 16);

  return (
    <Link href={`/book/${id}`}>
      <div
        className={[
          "border-2 border-black rounded-lg bg-gray-300",
          "p-2 sm:p-4",
          // overall layout
          "flex flex-col sm:flex-row sm:justify-between",
          "gap-3 sm:gap-4",
          "text-black",
        ].join(" ")}
      >
        <div className="flex w-full sm:w-auto items-start gap-3 sm:gap-4">
          <BookImage thumbnail={thumbnail} size="md" />

          <div className="flex flex-col justify-start">
            <div className="text-base sm:text-xl lg:text-2xl font-semibold leading-snug">
              {title}
            </div>
            <div className="text-sm sm:text-base text-gray-700">{author}</div>

            <div className="mt-1 text-xs sm:text-base text-gray-600">
              3 Words Learned • {word_count} Words Saved
            </div>

            {/*  progress bar */}
            {/* <div className="mt-2 h-2 w-full max-w-xs bg-gray-200 rounded">
            <div className="h-full w-1/3 bg-blue-600 rounded"></div>
          </div> */}

            <div className="mt-2 text-xs text-gray-500 sm:hidden">
              Created: {fixedDate}
            </div>
          </div>
        </div>

        <div className="hidden sm:block text-sm lg:text-md text-gray-600 shrink-0">
          Created: {fixedDate}
        </div>
      </div>
    </Link>
  );
}
