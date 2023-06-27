import { create } from "zustand";

interface WordleStore {
  currentGuess: string;
  setCurrentGuess: (letter: string) => void;
  popCurrentGuess: () => void;
  resetCurrentGuess: () => void;
}

const useWordleStore = create<WordleStore>((set) => ({
  currentGuess: "",
  setCurrentGuess: (letter) =>
    set((store) => ({
      currentGuess: store.currentGuess + letter,
    })),
  popCurrentGuess: () =>
    set((store) => ({
      currentGuess: store.currentGuess.slice(0, -1),
    })),
  resetCurrentGuess: () => set(() => ({ currentGuess: "" })),
}));

export default useWordleStore;
