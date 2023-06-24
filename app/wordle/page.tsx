"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Line from "@components/Line";

interface IWord {
  day: string;
  num: string;
  answer: string;
}

const Wordle = () => {
  const [words, setWords] = useState<IWord[]>();
  const [solution, setSolution] = useState<string>();

  const [guesses, setGuesses] = useState(Array(6).fill(null));

  useEffect(() => {
    const handleType = (e: KeyboardEvent) => {};

    window.addEventListener("keydown", handleType);

    return window.removeEventListener("keydown", handleType);
  }, []);

  useEffect(() => {
    if (!words) return;

    const wordBank = words.map((word) => word.answer);
    const randomWord = wordBank[Math.floor(Math.random() * words.length)];
    setSolution(randomWord);
  }, [words]);

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
      {guesses.map((guess, i) => (
        <Line key={i} guess={guess ?? ""} />
      ))}
    </section>
  );
};

export default Wordle;
