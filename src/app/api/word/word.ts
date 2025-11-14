import { supabase } from "@/app/lib/supabaseServer";
import {
  DictionaryResponse,
  SearchedWord,
  SupaBaseError,
} from "@/app/types/types";

const dictURL = process.env.NEXT_PUBLIC_WORD_URL;

export function reformatDictResponse(
  firstEntry: DictionaryResponse,
  query: string
) {
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

    if (error) throw new SupaBaseError("Supabase Failed Adding Word");

    return { success: true, data };
  } catch (error: unknown | SupaBaseError) {
    if (error instanceof SupaBaseError) {
      console.error("Supabase Error: ", error.message);
    }
    return { success: false, error };
  }
}

export async function getWordsFromBook(id: number) {
  try {
    const { data, error } = await supabase.rpc("get_words_from_book", {
      p_id: id,
    });

    if (error) throw new SupaBaseError("Supabase Failed to fetch words");
    return {
      success: true,
      data,
    };
  } catch (error: unknown | SupaBaseError) {
    if (error instanceof SupaBaseError) {
      console.error("Supabase Error: ", error.message);
    }
    return {
      success: false,
      error,
    };
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
      throw new Error("failed");
    }

    if (json.length === 0) {
      return undefined;
    }

    const firstEntry = json[0];

    const searchedWord = reformatDictResponse(firstEntry, query);

    return searchedWord;
  } catch (error: unknown) {
    console.error("Failed to fetch word search:", error);
    return undefined;
  }
}
