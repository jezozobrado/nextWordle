"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Line from "@components/Line";
import LETTERS from "@constants/letters";
import mask from "@utils/mask";
import Keyboard from "@components/Keyboard";
import KEYS from "@constants/keyboard";
import useWordleStore from "@app/wordle/store/wordle";
import useIsGameOverStore from "@app/wordle/store/gameOver";
import useGuessCount from "./store/guessCount";

interface IWord {
  day: string;
  num: string;
  answer: string;
}

const Wordle = () => {
  const [words, setWords] = useState<IWord[]>();
  const [solution, setSolution] = useState<string>("");

  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(null));
  const currentGuess = useWordleStore((s) => s.currentGuess);
  const setCurrentGuess = useWordleStore((s) => s.setCurrentGuess);
  const popCurrentGuess = useWordleStore((s) => s.popCurrentGuess);
  const resetCurrentGuess = useWordleStore((s) => s.resetCurrentGuess);

  const [colors, setColors] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );
  const isGameOver = useIsGameOverStore((s) => s.isGameOver);
  const setIsGameOver = useIsGameOverStore((s) => s.setIsGameOver);

  const guessCount = useGuessCount((s) => s.guessCount);
  const setGuessCount = useGuessCount((s) => s.setGuessCount);
  const resetGuessCount = useGuessCount((s) => s.resetGuessCount);

  const [keys, setKeys] = useState<{ [letter: string]: string }>({});

  const [replay, setReplay] = useState(0);
  const [isGiveUp, setIsGiveUp] = useState(false);

  const currentColorRef = useRef<string[]>(Array(5).fill("lightgray"));
  const currentGuessRef = useRef("");
  const solutionRef = useRef("");

  const keysRef = useRef(
    Object.fromEntries(KEYS.map((key) => [key.toUpperCase(), ""]))
  );

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      if (!guessCount) break;
      if (keysRef.current[guesses[guessCount - 1].charAt(i)] === "lightgreen")
        continue;
      keysRef.current = {
        ...keysRef.current,
        [guesses[guessCount - 1].charAt(i)]: colors[guessCount - 1][i],
      };
    }
    setKeys(keysRef.current);
  }, [colors, guesses, guessCount]);

  useEffect(() => {
    setColors((oldColors) =>
      oldColors.map((colors, i) => {
        if (i === guessCount - 1) return currentColorRef.current;
        return colors;
      })
    );
  }, [guessCount]);

  useEffect(() => {
    currentColorRef.current = Array(5).fill("lightgray");
  }, [colors]);

  useEffect(() => {
    if (currentGuess) currentGuessRef.current = currentGuess; //used for yellow checking
  }, [currentGuess]);

  useEffect(() => {
    const handleType = (e: KeyboardEvent) => {
      if (isGameOver) return;
      //if ENTER and guess is incomplete, do nothing
      if (e.key === "Enter" && currentGuess.length < 5) return;

      //if BACKSPACE, delete one character
      if (e.key === "Backspace") return popCurrentGuess();

      //if ENTER and guess is complete, lock in guess, reset currentGuess, increment guessCount
      if (e.key === "Enter" && currentGuess.length >= 5) {
        for (let i = 0; i < 5; i++) {
          if (currentGuess.charAt(i) === solution.charAt(i)) {
            currentColorRef.current = currentColorRef.current.map((o, j) => {
              if (i === j) {
                return "lightgreen";
              }
              return o;
            });
            currentGuessRef.current = mask(currentGuessRef.current, i);
            solutionRef.current = mask(solutionRef.current, i);
          }
        }

        for (let i = 0; i < 5; i++) {
          if (currentGuessRef.current.charAt(i) === "?") continue;
          if (solutionRef.current.includes(currentGuessRef.current.charAt(i))) {
            currentColorRef.current = currentColorRef.current.map((o, j) => {
              if (i === j) {
                return "lightyellow";
              }
              return o;
            });

            solutionRef.current = solutionRef.current.replace(
              currentGuessRef.current.charAt(i),
              "?"
            );
            currentGuessRef.current = mask(currentGuessRef.current, i);
          }
        }

        setGuesses((oldGuesses) =>
          oldGuesses.map((oldGuess, i) => {
            if (i === guessCount) return currentGuess.toUpperCase();
            return oldGuess;
          })
        );

        resetCurrentGuess();
        currentGuessRef.current = "";
        solutionRef.current = solution;
        setGuessCount();

        // if (currentGuess) currentGuessRef.current = currentGuess; //used for yellow checking
        if (solution && solution === currentGuess) setIsGameOver(true);
        return;
      }

      //if guess is complete and keys are still pressed, do nothing
      if (currentGuess.length === 5) return;

      //if key is not alphabet, do nothing
      if (!LETTERS.includes(e.code)) return;

      //else append key to currentGuess
      setCurrentGuess(e.key.toUpperCase());
    };

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, guessCount, solution]);

  useEffect(() => {
    if (!words) return;

    const wordBank = words.map((word) => word.answer);
    const randomWord = wordBank[Math.floor(Math.random() * words.length)];
    setSolution(randomWord);
    solutionRef.current = randomWord;
  }, [words, replay]);

  useEffect(() => console.log(solution), [solution]);

  useEffect(() => {
    axios
      .get("https://wordle-answers-solutions.p.rapidapi.com/answers", {
        headers: {
          "X-RapidAPI-Key":
            "058baf8782mshc8bf1e4463e4258p15c530jsn7b095ab2d73c",
          "X-RapidAPI-Host": "wordle-answers-solutions.p.rapidapi.com",
        },
      })
      .then((res) => setWords(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleRestart = () => {
    resetCurrentGuess();
    setColors(Array(6).fill(Array(5).fill("")));
    setGuesses(Array(6).fill(null));
    setIsGameOver(false);
    resetGuessCount();
    setKeys({});
    setReplay((oldCounter) => oldCounter + 1);
    setIsGiveUp(false);

    currentColorRef.current = Array(5).fill("lightgray");
    currentGuessRef.current = "";
    keysRef.current = Object.fromEntries(
      KEYS.map((key) => [key.toUpperCase(), ""])
    );
  };

  const handleGiveUp = () => {
    setIsGameOver(true);
    setIsGiveUp(true);
  };

  return (
    <section className="flex flex-col justify-center items-center w-full gap-[5px]">
      {guesses.map((guess, i) => {
        const isCurrentGuess =
          i === guesses.findIndex((guess) => guess === null);

        return (
          <Line
            key={i}
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            color={colors[i]}
          />
        );
      })}

      {isGameOver && !isGiveUp && (
        <span>Congratulations! You got the word.</span>
      )}
      {guesses[5] !== null && !isGameOver && (
        <span>{`Oops, the word is ${solution}.`}</span>
      )}
      {isGiveUp && <span>{`Oops, the word is ${solution}.`}</span>}

      <Keyboard colors={keys} />
      <div className={`mt-4 flex w-56 justify-center items-center`}>
        {isGameOver ? (
          <button className="black_btn " onClick={handleRestart}>
            Play again
          </button>
        ) : (
          <button className="black_btn" onClick={handleGiveUp}>
            Give up
          </button>
        )}
      </div>
    </section>
  );
};

export default Wordle;
