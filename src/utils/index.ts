import randomWords from "random-words";

export function generateTest(wordCount: number) {
  return randomWords(wordCount).join(" ").split("");
}

export const roundToTen = (n: number) => {
  return Math.ceil((n + 1) / 10) * 10;
};

export const roundToDecimal = (n: number, decimalPlaces: number) => {
  return Math.round(n * 10 ** decimalPlaces) / 10 ** decimalPlaces;
};

export const secsToReadable = (seconds: number) => {
  const str = "";
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};

export const dateToReadable = (d: any) => {
  const date = new Date(d);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
