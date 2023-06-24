import React from "react";

interface Props {
  guess: string;
  color: string[];
}
const Line = ({ guess, color }: Props) => {
  const WORD_LENGTH = 5;

  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(
      <div
        key={i}
        className={`w-20 h-20 border border-solid border-black text-4xl flex justify-center items-center bg-${color[i]}-300`}
      >
        {guess[i]}
      </div>
    );
  }
  return <div className="flex gap-[5px]">{tiles}</div>;
};

export default Line;
