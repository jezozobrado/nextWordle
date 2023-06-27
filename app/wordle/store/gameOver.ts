import { create } from "zustand";

interface IsGameOverStore {
  isGameOver: boolean;
  setIsGameOver: (bool: boolean) => void;
}

const useIsGameOverStore = create<IsGameOverStore>((set) => ({
  isGameOver: false,
  setIsGameOver: (bool) =>
    set(() => ({
      isGameOver: bool,
    })),
}));

export default useIsGameOverStore;
