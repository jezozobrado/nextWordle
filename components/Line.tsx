import React from "react";

interface Props {
  guess: string;
}
const Line = ({ guess }: Props) => {
  const WORD_LENGTH = 5;

  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    tiles.push(
      <div key={i} className="w-20 h-20 border border-solid border-black">
        {char}
      </div>
    );
  }
  return <div className="flex gap-[5px]">{tiles}</div>;
};

export default Line;
