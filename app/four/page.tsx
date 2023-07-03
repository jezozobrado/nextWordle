"use client";
import React, { useEffect, useMemo, useState } from "react";

const Four = () => {
  const rawSolution = [
    ["full", "king", "twin", "queen", "Bed sizes"],
    ["gnat", "gnome", "gnocchi", "gnaw", "Words with silent G"],
    ["gnu", "knew", "new", "nu", "Homophones"],
    ["garlic", "mirror", "crucifix", "sunlight", "Anti-vampire"],
  ];

  const colors = useMemo(
    () => ["lightcoral", "sandybrown", "mediumaquamarine", "lightblue"],
    []
  );

  console.log(rawSolution);

  const [solution, setSolution] = useState<string[][]>([]);
  const [shuffledSolution, setShuffledSolution] = useState<string[]>();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState<string[][]>([]);

  const handleSubmit = (guesses: string[], solution: string[][]) => {
    const stringifiedSolution = solution.map((s) => s.join(""));
    const stringifiedGuess = guesses.sort().join("");

    if (stringifiedSolution.includes(stringifiedGuess)) {
      setShuffledSolution((old) => old?.filter((o) => !guesses.includes(o)));
      setCorrectGuesses((o) => [...o, guesses]);
      setGuesses([]);

      const container = document.getElementById("container");
      const children = container && container.children;
      if (!children) return;

      for (let i = 0; i < children.length; i++) {
        let child = children[i] as HTMLElement;
        child.style.removeProperty("background-color");
      }

      setCorrectCount((o) => o + 1);
    }
  };

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      const tile = document.getElementById(String(i));
      if (!tile) return;
      tile.style.backgroundColor = colors[i];
    }
  }, [shuffledSolution]);

  useEffect(() => setSolution(rawSolution), []);

  useEffect(() => {
    solution.map((s) => {
      s.pop();
      s.sort();
    });

    setShuffledSolution(shuffleArray(solution.flat(2)));
  }, [solution]);

  useEffect(() => {
    shuffleArray(solution.flat(2));
  }, []);

  return (
    <>
      <div
        className="grid grid-cols-4 grid-rows-4 w-[550px] m-auto gap-2 h-[300px]"
        id="container"
      >
        {correctGuesses.flat(0).map((words, i) => (
          <div
            key={i}
            id={String(i)}
            className=" flex justify-center items-center content-center rounded-md col-span-4 flex-col"
          >
            <span className="font-bold">
              {rawSolution.find((r) => r.includes(correctGuesses[i][0]))?.[4]}
            </span>
            <span>{words.join(", ").toUpperCase()}</span>
          </div>
        ))}
        {/* {correctGuesses.flat(2).map((word, i) => (
          <div
            key={i}
            id={word}
            className="border flex justify-center items-center rounded-md"
          >
            {word.toUpperCase()}
          </div>
        ))} */}
        {shuffledSolution?.map((word, i) => (
          <div
            key={i}
            id={word}
            className="border flex justify-center items-center rounded-md cursor-pointer"
            onClick={() => {
              const tile = document.getElementById(word);

              if (!tile) return;

              if (tile.style.backgroundColor === "lightgreen") return;

              if (tile.style.backgroundColor === "lightgray") {
                tile.style.removeProperty("background-color");

                setGuesses((g) => g.filter((x) => x !== word));
                return;
              }

              if (guesses?.length >= 4) return;

              tile.style.backgroundColor = "lightgray";
              setGuesses((g) => [...g, word]);
            }}
          >
            {word.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center items-center mt-5 gap-2">
        <button
          disabled={guesses.length !== 4}
          className="black_btn"
          onClick={() => handleSubmit(guesses, solution)}
        >
          Submit
        </button>
      </div>
    </>
  );
};

function shuffleArray(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default Four;
