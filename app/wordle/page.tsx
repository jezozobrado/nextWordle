"use client";

import React from "react";

import Keyboard from "@components/wordle/Keyboard";
import KEYS from "@constants/keyboard";
import { useWordle } from "./useWordle";

import { MdOutlineCancel } from "react-icons/md";
import Line from "@components/wordle/Line";
import LineResults from "@components/wordle/LineResults";
import PlayAgainButton from "@components/wordle/PlayAgainButton";
import Delayed from "@components/Delayed";

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

  const handleCloseModal = () => {
    const modal = document.querySelector("[data-results]") as HTMLDialogElement;
    modal?.close();
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
            <div className="flex justify-end items-center w-full pb-2">
              <button
                onClick={() => {
                  handleCloseModal();
                }}
              >
                <MdOutlineCancel size={25} />
              </button>
            </div>
            <span>Congratulations! You got the word </span>
            <span className="bg-green-300 px-1 rounded-md font-bold">
              {solution}
            </span>
            <div className="flex gap-[3px] flex-col mt-3">
              {guesses.map((guess, i) => {
                return <LineResults key={i} color={colors[i]} />;
              })}
            </div>
            <div className="flex w-full justify-center mt-4">
              <PlayAgainButton
                handleRestart={handleRestart}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>
        )}
        {guesses[5] !== null && !isGameOver && (
          <div>
            <div className="flex justify-end items-center w-full pb-2">
              <button
                onClick={() => {
                  handleCloseModal();
                }}
              >
                <MdOutlineCancel size={25} />
              </button>
            </div>
            <span>{`Oops, the word is `}</span>
            <span className="bg-green-300 px-1 rounded-md font-bold">
              {solution}
            </span>
            <div className="flex w-full justify-center mt-4">
              <PlayAgainButton
                handleRestart={handleRestart}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>
        )}
      </dialog>

      <Keyboard colors={keys} />

      {(isGameOver || isLoss) && (
        <Delayed>
          <div className="flex justify-between items-center w-[250px]">
            <button
              className="black_btn"
              onClick={() => {
                const modal = document.querySelector(
                  "[data-results]"
                ) as HTMLDialogElement;
                modal.inert = true;
                modal.showModal();
                modal.inert = false;
              }}
            >
              See results
            </button>
            <PlayAgainButton
              handleRestart={handleRestart}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </Delayed>
      )}
    </section>
  );
};

export default Wordle;
