import useGuessCount from "@app/wordle/store/guessCount";
import React, { useEffect, useState } from "react";

interface Props {
  guess: string;
  color: string[];
}
const Line = ({ guess, color }: Props) => {
  const WORD_LENGTH = 5;
  const tiles = [];

  const [revealColor, setRevealColor] = useState(0);
  const guessCount = useGuessCount((s) => s.guessCount);

  useEffect(() => {
    setRevealColor((oldCounter) => oldCounter + 1);
  }, [guessCount]);

  useEffect(() => {
    const tile = document.getElementById("tile");
    tile?.classList.add("animate-wordle");
  }, [revealColor]);

  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(
      <div
        key={i}
        className={`w-20 h-20 rounded-md border border-solid text-4xl flex justify-center items-center ${color[i]}`}
      >
        {guess[i]}
      </div>
    );
  }

  return (
    <div className="flex gap-[5px]" id="line">
      {tiles}
    </div>
  );
};

export default Line;
