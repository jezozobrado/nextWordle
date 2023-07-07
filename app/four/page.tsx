"use client";
import { spawn } from "child_process";
import React, { useEffect, useMemo, useState } from "react";
import { GoDotFill, GoDot } from "react-icons/go";

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

  const animationMap: { [key: string]: string } = {
    0: "270px",
    1: "170px",
    2: "70px",
    3: "0px",
  };

  const [solution, setSolution] = useState<string[][]>([]);
  const [shuffledSolution, setShuffledSolution] = useState<string[]>();
  const [guesses, setGuesses] = useState<string[]>([]);

  const [correctGuesses, setCorrectGuesses] = useState<string[][]>([]);
  const [attempts, setAttempts] = useState(4);

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
        className="grid grid-cols-4 grid-rows-4 w-[550px] m-auto gap-2 h-[300px]"
        id="container"
      >
        {correctGuesses.flat(0).map((words, i) => (
          <div
            key={i}
            id={String(i)}
            className={`flex justify-center items-center content-center rounded-md col-span-4 flex-col animate-riseUp`}
            style={
              {
                animation: "correctAnimation 1s",
                "--movementY": animationMap[i],
              } as React.CSSProperties
            }
          >
            <span className="font-bold">
              {rawSolution.find((r) => r.includes(correctGuesses[i][0]))?.[4]}
            </span>
            <span>{words.join(", ").toUpperCase()}</span>
          </div>
        ))}

        {shuffledSolution?.map((word, i) => (
          <div
            key={i}
            id={word}
            className="border flex justify-center items-center rounded-md cursor-pointer"
            onAnimationEnd={() => {
              const tile = document.getElementById(word);

              tile?.style.removeProperty("animation");
            }}
            onClick={() => {
              const tile = document.getElementById(word);

              if (!tile) return;

              if (tile.style.backgroundColor === "gray") {
                tile.style.removeProperty("background-color");
                tile.style.animation = "mouseDown 0.15s";
                setGuesses((g) => g.filter((x) => x !== word));
                return;
              }

              if (guesses?.length >= 4) return;

              tile.style.animation = "mouseDown 0.15s";
              tile.style.backgroundColor = "gray";
              setGuesses((g) => [...g, word]);
            }}
            onMouseUp={() => {
              const tile = document.getElementById(word);
              if (!tile) return;
              tile.style.removeProperty("animation");
            }}
          >
            {word.toUpperCase()}
          </div>
        ))}
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
