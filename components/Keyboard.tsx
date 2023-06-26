import KEYS from "@constants/keyboard";
import { LuDelete } from "react-icons/lu";

interface Props {
  colors: { [letter: string]: string };
}
const Keyboard = ({ colors }: Props) => {
  return (
    <section className="flex flex-col gap-1 mt-5">
      <div className="flex w-[650px] justify-between gap-1">
        {KEYS.slice(0, 10).map((letter, i) => (
          <div
            key={i}
            className="border h-10 flex justify-center items-center rounded-md  flex-auto"
            style={{ background: `${colors[letter]}` }}
          >
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex w-[650px] justify-between gap-1">
        {KEYS.slice(10, 19).map((letter, i) => (
          <div
            key={i}
            className="border  h-10 flex justify-center items-center rounded-md flex-auto"
            style={{ background: `${colors[letter]}` }}
          >
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex w-[650px]  justify-between gap-1">
        {["DEL", ...KEYS.slice(19), "ENTER"].map((letter, i) => (
          <div
            key={i}
            className="border h-10 flex justify-center items-center rounded-md flex-auto"
            style={{ background: `${colors[letter]}` }}
          >
            {letter === "DEL" ? <LuDelete size="30px" /> : letter.toUpperCase()}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Keyboard;
