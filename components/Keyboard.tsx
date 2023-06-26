import KEYS from "@constants/keyboard";

interface Props {
  colors: { [letter: string]: string };
}
const Keyboard = ({ colors }: Props) => {
  console.log("ulul", colors);
  return (
    <section className="flex w-[500px] flex-wrap gap-1">
      {KEYS.map((letter, i) => (
        <div
          key={i}
          className="border w-16 h-10 flex justify-center items-center rounded-md"
          style={{ background: `${colors[letter]}` }}
        >
          {letter.toUpperCase()}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
