import { useEffect } from "react";

const bookURL = process.env.NEXT_PUBLIC_BOOK_URL;
const bookKey = process.env.NEXT_PUBLIC_BOOY_KEY;

export function useBookSearch(title: string) {
  const fullURL = `${bookURL}q=${title}&key=${bookKey}`;

  useEffect(() => {
    async function searchBook() {
      const data = await fetch(fullURL);
      console.log(data);
      return data;
    }
    searchBook();
  }, [title]);
}
