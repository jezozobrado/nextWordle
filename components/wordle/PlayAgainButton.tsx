import React from "react";

interface Props {
  handleRestart: () => void;
  handleCloseModal: () => void;
}
const PlayAgainButton = ({ handleRestart, handleCloseModal }: Props) => {
  return (
    <button
      className="black_btn"
      onClick={() => {
        handleRestart();
        handleCloseModal();
      }}
    >
      Play again
    </button>
  );
};

export default PlayAgainButton;
