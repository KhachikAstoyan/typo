interface ISnapshot {
  charsTyped: number;
  errors: number;
  errorsDelta: number;
  time: number;
  rawWpm: number;
  wpm: number;
}

interface TestResult {
  type: string;
  time: number;
  charsTyped: number;
  wpm: number;
  accuracy: number;
  snapshots: ISnapshot[];
}

interface Coords {
  x: number;
  y: number;
}

interface UserStats {
  avg: {
    accuracy: number;
    time: number;
    wpm: number;
  };
  max: {
    wpm: number;
    accuracy: number;
  };
  totalTime: number;
  count: number;
}
