import { create } from "zustand";

interface GuessCount {
  guessCount: number;
  setGuessCount: () => void;
  resetGuessCount: () => void;
}

const useGuessCount = create<GuessCount>((set) => ({
  guessCount: 0,
  setGuessCount: () =>
    set((store) => ({
      guessCount: store.guessCount + 1,
    })),
  resetGuessCount: () =>
    set(() => ({
      guessCount: 0,
    })),
}));

export default useGuessCount;
