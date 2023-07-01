"use client";
import React, { useEffect, useMemo, useState } from "react";

const Four = () => {
  const solution = useMemo(
    () => [
      ["full", "king", "twin", "queen"],
      ["gnat", "gnome", "gnocchi", "gnaw"],
      ["gnu", "knew", "new", "nu"],
      ["garlic", "mirror", "crucifix", "sunlight"],
    ],
    []
  );

  const colors = useMemo(
    () => ["lightgreen", "lightyellow", "dodgerblue", "tomato"],
    []
  );

  const [shuffledSolution, setShuffledSolution] = useState<string[]>();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);

  const handleSubmit = (guesses: string[], solution: string[][]) => {
    console.log("clicked");
    const stringifiedSolution = solution.map((s) => s.join(""));
    const stringifiedGuess = guesses.sort().join("");

    if (stringifiedSolution.includes(stringifiedGuess)) {
      console.log(guesses);
      for (let i = 0; i < 4; i++) {
        const tile = document.getElementById(guesses[i]);
        if (!tile) return;
        tile.style.backgroundColor = colors[correctCount];
      }
      setGuesses([]);
      setCorrectCount((o) => o + 1);
    }
  };

  useEffect(() => {
    solution.map((s) => s.sort());
    setShuffledSolution(shuffleArray(solution.flat(2)));
  }, []);

  useEffect(() => {
    shuffleArray(solution.flat(2));
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-4 w-[500px] m-auto gap-2 h-[250px]">
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
