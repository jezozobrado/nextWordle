import KEYS from "@constants/keyboard";
import KeyboardLine from "./KeyboardLine";

interface Props {
  colors: { [letter: string]: string };
}
const Keyboard = ({ colors }: Props) => {
  return (
    <section className="flex flex-col gap-1 my-5">
      <KeyboardLine keys={KEYS.slice(0, 10)} keyColorMap={colors} />
      <KeyboardLine keys={KEYS.slice(10, 19)} keyColorMap={colors} />
      <KeyboardLine
        keys={["BACKSPACE", ...KEYS.slice(19), "ENTER"]}
        keyColorMap={colors}
      />
    </section>
  );
};

export default Keyboard;
