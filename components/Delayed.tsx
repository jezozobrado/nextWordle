import { modalDelay } from "@constants/delay";
import { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
  waitBeforeShow?: number;
}
const Delayed = ({ children, waitBeforeShow = modalDelay }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? children : null;
};

export default Delayed;
