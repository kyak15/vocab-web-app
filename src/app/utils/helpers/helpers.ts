import { supabase } from "@/app/lib/supabaseServer";
import {
  DictionaryResponse,
  SearchedBook,
  SearchedWord,
} from "@/app/types/types";

const bookURL = process.env.NEXT_PUBLIC_BOOK_URL;
const bookKey = process.env.NEXT_PUBLIC_BOOK_KEY;
const dictURL = process.env.NEXT_PUBLIC_WORD_URL;

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

export async function getSearchedWord(
  query: string
): Promise<SearchedWord | undefined> {
  try {
    const fullURL = `${dictURL}${query}`;
    const response = await fetch(fullURL);
    const json: DictionaryResponse[] = await response.json();

    if (!response.ok) {
      throw new Error("Unknown error from Dictionary API");
    }

    if (json.length === 0) {
      return undefined;
    }

    const firstEntry = json[0];
    const searchedWord: SearchedWord = {
      word: firstEntry.word,
      audioUrl: firstEntry.phonetics?.find((p) => p.audio)?.audio,
      meanings: firstEntry.meanings.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map((def) => ({
          definition: def.definition,
          example: def.example,
        })),
      })),
      sourceUrl: `https://dictionaryapi.dev/api/v2/entries/en/${query}`,
    };

    return searchedWord;
  } catch (error) {
    console.error("Failed to fetch word search:", error);
    return undefined;
  }
}

export async function addBook(
  title: string,
  author: string,
  bookId: string,
  thumbnail: string
) {
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
    console.error("Failed to Add Book:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function addWord({
  word,
  definition,
  partOfSpeech,

  audioUrl,
}: {
  word: string;
  definition: string;
  partOfSpeech: string;
  example?: string;
  audioUrl?: string;
}) {
  try {
    const { data, error } = await supabase.rpc("add_word", {
      p_word: word,
      p_definition: definition,
      p_part_of_speech: partOfSpeech,
      //p_example: example ?? null,
      p_audio_url: audioUrl ?? null,
    });

    if (error) throw error;

    console.log("✅ Word added successfully:", data);
    return { success: true, data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("❌ Error adding word:", err.message);
    return { success: false, error: err.message };
  }
}
