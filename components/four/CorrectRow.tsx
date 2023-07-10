import React from "react";

interface Props {
  correctGuesses: string[][];
  rawSolution: string[][];
}

const CorrectRow = ({ correctGuesses, rawSolution }: Props) => {
  const animationMap: { [key: string]: string } = {
    0: "270px",
    1: "170px",
    2: "70px",
    3: "0px",
  };
  return (
    <>
      {correctGuesses.flat(0).map((words, i) => (
        <div
          key={i}
          id={String(i)}
          className={`flex justify-center items-center content-center rounded-md col-span-4 flex-col `}
          style={
            {
              animation: "correctAnimation 0.8s",
              "--movementY": animationMap[i],
            } as React.CSSProperties
          }
        >
          <span className="font-bold">
            {rawSolution
              .find((r) => r.includes(correctGuesses[i][0]))?.[4]
              .toUpperCase()}
          </span>
          <span>{words.join(", ").toUpperCase()}</span>
        </div>
      ))}
    </>
  );
};

export default CorrectRow;
