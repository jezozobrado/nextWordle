"use client";

import React from "react";
import Line from "@components/Line";
import Keyboard from "@components/Keyboard";
import KEYS from "@constants/keyboard";
import { useWordle } from "./useWordle";
import LineResults from "@components/LineResults";

const Wordle = () => {
  const {
    solution,
    guesses,
    setGuesses,
    currentGuess,
    resetCurrentGuess,
    colors,
    setColors,
    isGameOver,
    setIsGameOver,
    resetGuessCount,
    keys,
    setKeys,
    setReplay,
    isLoss,
    setIsLoss,
    currentColorRef,
    currentGuessRef,
    keysRef,
    resetDelay,
  } = useWordle();

  const handleRestart = () => {
    resetCurrentGuess();
    setColors(Array(6).fill(Array(5).fill("")));
    setGuesses(Array(6).fill(null));
    setIsGameOver(false);
    resetGuessCount();
    resetDelay();
    setKeys({});
    setReplay((oldCounter) => oldCounter + 1);
    setIsLoss(false);

    currentColorRef.current = Array(5).fill("lightgray");
    currentGuessRef.current = "";
    keysRef.current = Object.fromEntries(
      KEYS.map((key) => [key.toUpperCase(), ""])
    );
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

      <dialog data-results className="border rounded-lg ">
        {isGameOver && !isLoss && (
          <div>
            <span>Congratulations! You got the word </span>
            <span className="bg-green-300 px-1 rounded-md font-bold">
              {solution}
            </span>
            <div className="flex gap-[3px] flex-col mt-3">
              {guesses.map((guess, i) => {
                return <LineResults key={i} color={colors[i]} />;
              })}
            </div>
            <button
              className="black_btn m-auto mt-5"
              onClick={() => {
                handleRestart();

                const modal = document.querySelector(
                  "[data-results]"
                ) as HTMLDialogElement;
                modal.close();
              }}
            >
              Play again
            </button>
          </div>
        )}
        {guesses[5] !== null && !isGameOver && (
          <div>
            <span>{`Oops, the word is `}</span>
            <span className="bg-green-300 px-1 rounded-md font-bold">
              {solution}
            </span>
            <button
              className="black_btn m-auto mt-5"
              onClick={() => {
                handleRestart();

                const modal = document.querySelector(
                  "[data-results]"
                ) as HTMLDialogElement;
                modal.close();
              }}
            >
              Play again
            </button>
          </div>
        )}
      </dialog>

      <Keyboard colors={keys} />
    </section>
  );
};

export default Wordle;
