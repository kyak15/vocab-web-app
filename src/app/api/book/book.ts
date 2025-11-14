import { supabase } from "@/app/lib/supabaseServer";
import { SearchedBook, SupaBaseError } from "@/app/types/types";
import { PostgrestError } from "@supabase/supabase-js";
const bookURL = process.env.NEXT_PUBLIC_BOOK_URL;
const bookKey = process.env.NEXT_PUBLIC_BOOK_KEY;

export async function addBook(
  title: string,
  author: string,
  bookId: string,
  thumbnail: string
) {
  try {
    const { data, error } = await supabase
      .from("books")
      .insert([
        {
          book_id: bookId,
          title: title,
          author: author,
          thumbnail: thumbnail,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new SupaBaseError("Supabase Failed to Add Word");
    }
    return data;
  } catch (error: SupaBaseError | unknown) {
    if (error instanceof SupaBaseError) {
      console.error("Supabase Failure: ", error.message);
    }
    return null;
  }
}

export async function getUserBooks() {
  try {
    const { data, error } = await supabase.rpc("get_user_books");
    if (error) throw new SupaBaseError("Supabase Failde to get Books");

    return {
      success: true,
      data,
    };
  } catch (error: SupaBaseError | unknown) {
    if (error instanceof SupaBaseError) {
      console.error("Supabase Failure: ", error.message);
    }
    return {
      success: false,
      error,
    };
  }
}

export async function getBookById(id: number) {
  try {
    const { data, error } = await supabase.rpc("get_book_by_id", {
      p_id: id,
    });
    if (error) throw new SupaBaseError("Supabase Failed to fetch book by id");

    console.log("fetched book: ", data);
    return {
      success: true,
      data,
    };
  } catch (error: SupaBaseError | unknown) {
    if (error instanceof SupaBaseError) {
      console.error("Supbase Failure: ", error.message);
    }
    return { success: false, error };
  }
}

export async function getSearchedBooks(title: string) {
  try {
    const fullURL = `${bookURL}q=${title.replace(/\s/g, "+")}&maxResults=10&key=${bookKey}`;
    const req = await fetch(fullURL);
    if (!req.ok) {
      throw Error("Request Failed");
    }

    const res = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedData: SearchedBook[] = res.items?.map((item: any) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors[0], // only get the first author since api responds in arr
        desc: item.volumeInfo.description,
        thumbnail: item.volumeInfo?.imageLinks
          ? item.volumeInfo?.imageLinks.thumbnail
          : null,
      };
    });

    return formattedData.filter((item) => item.thumbnail !== null);
  } catch (error) {
    console.error("failed to fetch from book api. error: ", error);
    return [];
  }
}
