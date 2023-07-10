import useFourStore from "@app/four/store/guesses";

interface Props {
  shuffledSolution?: string[];
}

const DefaultRow = ({ shuffledSolution }: Props) => {
  const guesses = useFourStore((s) => s.guesses);
  const setGuesses = useFourStore((s) => s.setGuesses);
  const popGuesses = useFourStore((s) => s.popGuesses);

  const handleClick = (word: string) => {
    const tile = document.getElementById(word);

    if (!tile) return;

    if (tile.style.backgroundColor === "gray") {
      tile.style.removeProperty("background-color");
      tile.style.animation = "mouseDown 0.15s";
      popGuesses(word);
      return;
    }

    if (guesses?.length >= 4) return;

    tile.style.animation = "mouseDown 0.15s";
    tile.style.backgroundColor = "gray";
    setGuesses(word);
  };

  const handleAnimationEnd = (word: string) => {
    const tile = document.getElementById(word);

    tile?.style.removeProperty("animation");
  };

  return (
    <>
      {shuffledSolution?.map((word, i) => (
        <div
          key={i}
          id={word}
          className="border flex justify-center items-center rounded-md cursor-pointer"
          onAnimationEnd={() => handleAnimationEnd(word)}
          onClick={() => handleClick(word)}
        >
          {word.toUpperCase()}
        </div>
      ))}
    </>
  );
};

export default DefaultRow;
