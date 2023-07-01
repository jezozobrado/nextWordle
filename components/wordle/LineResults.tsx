import React from "react";

interface Props {
  color: string[];
}
const LineResults = ({ color }: Props) => {
  const WORD_LENGTH = 5;
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(
      <div
        key={i}
        className={`w-8 h-8 border border-solid `}
        style={{ background: color[i] }}
      >
        &nbsp;
      </div>
    );
  }

  return <div className="flex gap-[3px] w-full justify-center ">{tiles}</div>;
};

export default LineResults;
