import { SavedBook, SearchedBook } from "@/app/types/types";
import BookImage from "../BookImage";
import { addBook } from "@/app/api/book/book";

export default function SearchedBookComp(props: SearchedBook) {
  const { id, author, thumbnail, title, desc } = props;

  const handleAddBook = async () => {
    const data = await addBook(title, author, id, thumbnail);
  };

  return (
    <div
      key={id}
      className=" bg-gray-400 border rounded-md flex flex-row px-4 py-2"
    >
      <BookImage thumbnail={thumbnail} size={"sm"} />
      <div className="flex flex-col px-4  flex-1 items-start">
        <p className="font-bold text-xl">{title}</p>
        <p className="text-lg">{author}</p>
        <div className="w-full h-18 overflow-hidden line-clamp-3 ">
          {desc ? desc : "This Book does not have a Description"}
        </div>
      </div>
      <div className="">
        <button
          className="rounded-md px-2 py-1 bg-white hover:bg-gray-700"
          onClick={handleAddBook}
        >
          Save Book
        </button>
      </div>
    </div>
  );
}
