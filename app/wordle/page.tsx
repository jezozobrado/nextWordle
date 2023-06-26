"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Line from "@components/Line";
import LETTERS from "@constants/letters";
import mask from "@utils/mask";

interface IWord {
  day: string;
  num: string;
  answer: string;
}

const Wordle = () => {
  const [words, setWords] = useState<IWord[]>();
  const [solution, setSolution] = useState<string>("");

  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");

  const [colors, setColors] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  const currentColorRef = useRef<string[]>(Array(5).fill("lightgray"));
  const currentGuessRef = useRef("");
  const solutionRef = useRef("");

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
      if (e.key === "Backspace")
        return setCurrentGuess(currentGuess.slice(0, -1));

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

        setCurrentGuess("");

        currentGuessRef.current = "";
        solutionRef.current = solution;

        // setCurrentColor(Array(5).fill(""));
        setGuessCount((oldGuessCount) => oldGuessCount + 1);

        // if (currentGuess) currentGuessRef.current = currentGuess; //used for yellow checking
        if (solution && solution === currentGuess) setIsGameOver(true);
        return;
      }

      //if guess is complete and keys are still pressed, do nothing
      if (currentGuess.length === 5) return;

      //if key is not alphabet, do nothing
      if (!LETTERS.includes(e.code)) return;

      //else append key to currentGuess

      setCurrentGuess((oldGuess) => oldGuess + e.key.toUpperCase());
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
  }, [words]);

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
      {isGameOver && <span>Congratulations! You got the word.</span>}
      {guesses[5] !== null && !isGameOver && (
        <span>{`Oops, the word is ${solution}.`}</span>
      )}
    </section>
  );
};

export default Wordle;
