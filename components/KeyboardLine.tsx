import LETTERS from "@constants/letters";
import useIsGameOverStore from "@store/gameOver";
import useWordleStore from "@store/wordle";
import React from "react";
import { LuDelete } from "react-icons/lu";

interface Props {
  keys: string[];
  keyColorMap: { [letter: string]: string };
}

const KeyboardLine = ({ keys, keyColorMap }: Props) => {
  const currentGuess = useWordleStore((s) => s.currentGuess);
  const setCurrentGuess = useWordleStore((s) => s.setCurrentGuess);
  const popCurrentGuess = useWordleStore((s) => s.popCurrentGuess);

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
            console.log("x", currentGuess);
          }}
          key={i}
          className="border h-10 flex justify-center items-center rounded-md flex-auto"
          style={{ background: `${keyColorMap[letter]}` }}
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
