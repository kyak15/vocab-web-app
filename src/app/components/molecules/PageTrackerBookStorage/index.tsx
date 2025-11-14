import { SavedBook } from "@/app/types/types";
import { Dispatch, SetStateAction } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

type PageTrackerBookStorageProps = {
  pageNumber: number;
  data: SavedBook[];
  setPageNumber: Dispatch<SetStateAction<number>>;
};

export default function PageTrackerBookStorage({
  pageNumber,
  data,
  setPageNumber,
}: PageTrackerBookStorageProps) {
  return (
    <div className="sticky bottom-0 py-3 flex flex-row justify-center">
      {data.length >= 4 && (
        <div className="flex flex-row items-center justify-center">
          <FaChevronLeft
            onClick={() => pageNumber !== 0 && setPageNumber(pageNumber - 3)}
            className="cursor-pointer"
          />

          {Array.from({ length: Math.ceil(data.length / 3) }).map((_, i) => (
            <GoDotFill key={i} fill={pageNumber / 3 === i ? "red" : "white"} />
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
  );
}
