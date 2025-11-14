export type SavedBook = {
  id: number;
  createdAt: string;
  title: string;
  author: string;
  thumbnail: string;
  word_count: number;
  book_id: string;
  currently_reading: boolean;
};
export type Definition = {
  definition: string;
  example?: string;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

export type SearchedWord = {
  word: string;
  audioUrl?: string;
  meanings: Meaning[];
  sourceUrl: string;
};

export type SavedWord = {
  id: string;
  bookId: string;
  word: string;
  definition: string;
  phonetic?: string;
  part_of_speech?: string;
  createdAt: string;
  is_learned: boolean;
};

export type SearchedBook = {
  id: string;
  title: string;
  author: string;
  desc: string;
  thumbnail: string;
};

export interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics?: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }>;
  }>;
}

export class SupaBaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupaBaseError";
  }
}
