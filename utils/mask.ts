const mask = (word: string, index: number) => {
  return word.slice(0, index) + "?" + word.slice(index + 1);
};

export default mask;
