import { create } from "zustand";

interface DelayStore {
  delay: number;
  resetDelay: () => void;
  setDelay: () => void;
}

const useDelayStore = create<DelayStore>((set) => ({
  delay: 1250,
  setDelay: () =>
    set(() => ({
      delay: 1250,
    })),
  resetDelay: () =>
    set(() => ({
      delay: 0,
    })),
}));

export default useDelayStore;
