export interface UserStats {
  max: {
    wpm: number | null;
    accuracy: number | null;
  };
  avg: {
    accuracy: number | null;
    time: number | null;
    wpm: number | null;
  };
  totalTime: number | null;
  count: number;
}
