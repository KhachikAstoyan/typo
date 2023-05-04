import { useCallback, useRef, useState } from "react";

export const useStopWatch = (
  callback?: (time: Number) => any,
  interval = 100
) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const main = useCallback((startTime: number, counter: number) => {
    const nowTime = Date.now();
    const nextTime = startTime + counter * interval;
    timeoutIdRef.current = setTimeout(
      () => main(startTime, counter),
      interval - (nowTime - nextTime)
    );

    setTimeElapsed(nowTime - startTime);
    counter += 1;
    if (callback) {
      callback(nowTime - startTime);
    }
  }, []);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      let counter = 1;
      let startTime: number = Date.now();

      timeoutIdRef.current = setTimeout(
        () => main(startTime, counter),
        interval
      );
    }
  }, [timeElapsed]);

  const stop = useCallback(() => {
    clearTimeout(timeoutIdRef.current);
    setIsRunning(false);
  }, []);

  // TODO: implement this so that
  // the test can be stopped and resumed
  // const resume = useCallback(() => {}, []);

  const reset = useCallback(() => {
    setTimeElapsed(0);
    setIsRunning(false);
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = undefined;
  }, []);

  return {
    start,
    stop,
    reset,
    timeElapsed,
    isRunning,
  };
};
