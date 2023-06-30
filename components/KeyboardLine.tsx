import useDelayStore from "@app/wordle/store/delay";
import useIsGameOverStore from "@app/wordle/store/gameOver";
import useWordleStore from "@app/wordle/store/wordle";
import React, { useState } from "react";
import { LuDelete } from "react-icons/lu";
import { useDebounce } from "react-use";

interface Props {
  keys: string[];
  keyColorMap: { [letter: string]: string };
}

const KeyboardLine = ({ keys, keyColorMap }: Props) => {
  const currentGuess = useWordleStore((s) => s.currentGuess);
  const setCurrentGuess = useWordleStore((s) => s.setCurrentGuess);
  const popCurrentGuess = useWordleStore((s) => s.popCurrentGuess);
  const delay = useDelayStore((s) => s.delay);

  const [debouncedkeyColorMap, setDebouncedkeyColorMap] = useState(
    {} as { [letter: string]: string }
  );

  useDebounce(() => setDebouncedkeyColorMap(keyColorMap), delay, [keyColorMap]);

  const isGameOver = useIsGameOverStore((s) => s.isGameOver);

  return (
    <div className="flex w-[600px] justify-between gap-1">
      {keys.map((letter, i) => (
        <button
          onClick={() => {
            if (isGameOver) return;

            if (letter === "BACKSPACE") return popCurrentGuess();

            if (letter === "ENTER") {
              const event = new KeyboardEvent("keydown", { key: "Enter" });
              window.dispatchEvent(event);
              return;
            }

            if (currentGuess.length >= 5) return;
            setCurrentGuess(letter);
          }}
          key={i}
          className="border h-10 flex justify-center items-center rounded-md flex-auto"
          style={{ background: `${debouncedkeyColorMap[letter]}` }}
        >
          {letter === "BACKSPACE" ? (
            <LuDelete size="24px" />
          ) : (
            letter.toUpperCase()
          )}
        </button>
      ))}
    </div>
  );
};

export default KeyboardLine;
