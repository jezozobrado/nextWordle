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

  const [shuffledSolution, setShuffledSolution] = useState<string[]>();

  useEffect(() => setShuffledSolution(shuffleArray(solution.flat(2))), []);

  console.log(solution.flat(2));

  function shuffleArray(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    shuffleArray(solution.flat(2));
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 w-[500px] m-auto gap-2 h-[250px]">
      {shuffledSolution?.map((word, i) => (
        <div
          key={i}
          id={`tile-${i}`}
          className="border flex justify-center items-center rounded-md"
          onClick={() => {
            const tile = document.getElementById(`tile-${i}`);

            if (!tile) return;
            if (tile.style.backgroundColor) {
              tile.style.removeProperty("background-color");
            } else {
              tile.style.backgroundColor = "lightgray";
            }
          }}
        >
          {word.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default Four;
