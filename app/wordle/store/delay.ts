import { showKeyboardColorDelay } from "@constants/delay";
import { create } from "zustand";

interface DelayStore {
  delay: number;
  resetDelay: () => void;
  setDelay: () => void;
}

const useDelayStore = create<DelayStore>((set) => ({
  delay: showKeyboardColorDelay,
  setDelay: () =>
    set(() => ({
      delay: showKeyboardColorDelay,
    })),
  resetDelay: () =>
    set(() => ({
      delay: 0,
    })),
}));

export default useDelayStore;
