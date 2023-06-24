"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface IWord {
  day: string;
  num: string;
  answer: string;
}

const Wordle = () => {
  const [words, setWords] = useState<IWord[]>();
  const [solution, setSolution] = useState<string>();

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

  return <section>{solution}</section>;
};

export default Wordle;
