import { create } from "zustand";

interface FourStore {
  guesses: string[];
  setGuesses: (word: string) => void;
  popGuesses: (word: string) => void;
  resetGuesses: () => void;
}

const useFourStore = create<FourStore>((set) => ({
  guesses: [],
  setGuesses: (word) =>
    set((store) => ({
      guesses: [...store.guesses, word],
    })),
  popGuesses: (word) =>
    set((store) => ({
      guesses: store.guesses.filter((x) => x !== word),
    })),
  resetGuesses: () =>
    set(() => ({
      guesses: [],
    })),
}));

export default useFourStore;
