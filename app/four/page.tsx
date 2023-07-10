"use client";
import CorrectRow from "@components/four/CorrectRow";
import React, { useEffect, useMemo, useState } from "react";
import { GoDotFill, GoDot } from "react-icons/go";
import useFourStore from "./store/guesses";
import DefaultRow from "@components/four/DefaultRow";

const Four = () => {
  // const rawSolution = [
  //   ["full", "king", "twin", "queen", "Bed sizes"],
  //   ["gnat", "gnome", "gnocchi", "gnaw", "Words with silent G"],
  //   ["gnu", "knew", "new", "nu", "Homophones"],
  //   ["garlic", "mirror", "crucifix", "sunlight", "Anti-vampire"],
  // ];

  const rawSolution = [
    [
      "mandaluyong",
      "makati",
      "muntinlupa",
      "marikina",
      "NCR cities that start with M",
    ],
    ["bond", "manila", "wall", "yellow", "_______ paper"],
    ["home", "enter", "control", "end", "Keyboard keys"],
    ["time", "airplane", "balloon", "drone", "Things that fly"],
  ];

  const colors = useMemo(
    () => ["lightcoral", "sandybrown", "mediumaquamarine", "lightblue"],
    []
  );

  const [solution, setSolution] = useState<string[][]>([]);
  const [shuffledSolution, setShuffledSolution] = useState<string[]>();

  const guesses = useFourStore((s) => s.guesses);
  const resetGuesses = useFourStore((s) => s.resetGuesses);

  const [correctGuesses, setCorrectGuesses] = useState<string[][]>([]);
  const [attempts, setAttempts] = useState(4);

  const handleSubmit = (guesses: string[], solution: string[][]) => {
    const stringifiedSolution = solution.map((s) => s.join(""));
    const stringifiedGuess = guesses.sort().join("");

    if (!attempts) {
      for (let x of solution) {
        console.log(x);
      }
      console.log("pota", shuffledSolution, correctGuesses);

      return;
    }

    if (stringifiedSolution.includes(stringifiedGuess)) {
      setShuffledSolution((old) => old?.filter((o) => !guesses.includes(o)));
      setCorrectGuesses((o) => [...o, guesses]);
      resetGuesses();

      const container = document.getElementById("container");
      const children = container && container.children;
      if (!children) return;

      for (let i = 0; i < children.length; i++) {
        let child = children[i] as HTMLElement;
        child.style.removeProperty("background-color");
        // child.classList.add("animate-fadeInUp");
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const tile = document.getElementById(guesses[i]);
        if (!tile) break;
        tile.style.animation = "wrongAnimation 0.4s";
      }
      setAttempts((attempt) => attempt - 1);
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

  return (
    <>
      <span className="flex justify-center mb-3 font-medium">
        Create four groups of fours.
      </span>
      <div
        className="grid grid-cols-4 grid-rows-4 w-[600px] m-auto gap-2 h-[300px]"
        id="container"
      >
        <CorrectRow correctGuesses={correctGuesses} rawSolution={rawSolution} />
        <DefaultRow shuffledSolution={shuffledSolution} />
      </div>
      <div className="flex flex-row gap-2 items-center justify-center mt-4">
        <span>Attempts remaining:</span>

        {Array(attempts)
          .fill("")
          .map((_, i) => (
            <GoDotFill key={i} />
          ))}
        {Array(4 - attempts)
          .fill("")
          .map((_, i) => (
            <GoDot key={i} />
          ))}
      </div>
      <div className="flex w-full justify-center items-center mt-5 gap-2">
        <button
          disabled={guesses.length !== 4}
          className="black_btn"
          onClick={() => {
            handleSubmit(guesses, solution);
          }}
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
