import { Dispatch, SetStateAction } from "react";
import Button from "../../atoms/Button";

type FlashCardsPageHeaderProps = {
  length: number;
  sortType: "all" | "learned" | "not learned";
  setSortType: Dispatch<SetStateAction<"all" | "learned" | "not learned">>;
};

export default function FlashCardsPageHeader({
  length,
  sortType,
  setSortType,
}: FlashCardsPageHeaderProps) {
  return (
    <div className="py-6">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">
        Total Words: {length}
      </h1>
      <div className="flex items-center justify-between">
        <div className="text-white lg:text-xl">Sort:</div>
        <div className="space-x-2">
          <Button
            text="Learned"
            onClick={() => setSortType("learned")}
            className={`px-6 ${
              sortType === "learned"
                ? "opacity-100 ring-2 ring-white"
                : "opacity-70"
            }`}
          />
          <Button
            text="Not Learned"
            onClick={() => setSortType("not learned")}
            className={`px-6 ${
              sortType === "not learned"
                ? "opacity-100 ring-2 ring-white"
                : "opacity-70"
            }`}
          />
          <Button
            text="All"
            onClick={() => setSortType("all")}
            className={`px-6 ${
              sortType === "all"
                ? "opacity-100 ring-2 ring-white"
                : "opacity-70"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
