import { useTheme } from "@emotion/react";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSettings } from "../store/settings";
import { generateTest } from "../utils";
import { useStopWatch } from "./useStopWatch";

export const useTest = () => {
  const settings = useSettings();
  const [chars, setChars] = useState<string[]>(() => {
    if (settings.testMode === "words") {
      return generateTest(settings.wordCount);
    } else {
      return generateTest(50);
    }
  });
  const [extraChars, setExtraChars] = useState<number[]>([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [charsTyped, setCharsTyped] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const snapshots = useRef<ISnapshot[]>([]);
  const [isOver, setIsOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [actualWords, setActualWords] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const {
    start,
    stop,
    reset: resetTimer,
    timeElapsed,
    isRunning,
  } = useStopWatch(undefined, 1000);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setChars(generateTest(settings.wordCount));
    snapshots.current = [];
    setCharsTyped(0);
    setIsOver(false);
    setIsFocused(true);
    resetTimer();
    setActualWords(0);
    setErrors([]);
    setExtraChars([]);
    setCurrentChar(0);
  }, []);
  const theme = useTheme();

  const keyboardHandler = useCallback(
    (event: KeyboardEvent) => {
      if (isFocused) {
        event.stopPropagation();

        if (event.key === "Tab" && isOver && currentChar !== 0) {
          reset();
        }
      }
      if (isFocused && (event.key.length === 1 || event.key === "Backspace")) {
        if (!isRunning) {
          start();
        }

        if (currentChar === chars.length - 1) {
          if (settings.testMode === "words") {
            stop();
            setIsOver(true);
            return;
          } else {
            setChars([...chars, " ", ...generateTest(15)]);
          }
        }

        if (event.key === chars[currentChar]) {
          setCharsTyped((c) => c + 1);
          setErrors(errors.filter((err) => err != currentChar));
          setCurrentChar((cur) => cur + 1);
        } else if (event.key === "Backspace") {
          if (chars[currentChar - 1] !== " ") {
            if (extraChars.includes(currentChar - 1)) {
              const charCopy = [...chars];
              charCopy.splice(currentChar - 1, 1);
              setChars(charCopy);
            }
            setCurrentChar((cur) => (cur === 0 ? cur : cur - 1));
            setCharsTyped((cur) => cur - 1);
          }
        } else {
          setErrors((cur) => [...cur, currentChar]);
          setCurrentChar((cur) => (cur === chars.length - 1 ? cur : cur + 1));
        }

        if (chars[currentChar] === " ") setActualWords((c) => c + 1);
      }
    },
    [chars, currentChar, start, isFocused]
  );

  useEffect(() => {
    if (!isRunning) {
      setChars(generateTest(settings.wordCount));
    }
  }, [settings.wordCount]);

  useEffect(() => {
    // the test is over
    const timeInMinutes = timeElapsed / 60000;
    const result: TestResult = {
      type: `${settings.testMode}-${
        settings.testMode === "time" ? settings.time : settings.wordCount
      }`,
      time: timeElapsed,
      charsTyped,
      wpm: Math.max(0, (charsTyped - errors.length) / 5 / timeInMinutes),
      accuracy: (charsTyped * 100) / (charsTyped + errors.length),
      snapshots: snapshots.current,
    };

    if (!isRunning && timeElapsed !== 0) {
      toast.promise(
        axios.post("/api/tests/add", result),
        {
          loading: "Saving test...",
          success: "Test saved!",
          error: "Error saving test",
        },
        {
          style: {
            background: theme.bgSecondary,
            color: theme.textSecondary,
            boxShadow: "0 0 1px " + theme.textSecondary,
          },
          position: "bottom-right",
        }
      );
    }
  }, [isRunning]);

  useEffect(() => {
    if (
      settings.testMode === "time" &&
      settings.time - Math.round(timeElapsed / 1000) === 0
    ) {
      stop();
      setIsOver(true);
    }
    if (timeElapsed !== 0) {
      const currentIdx = Math.floor(timeElapsed / 1000) - 1;
      const prevsnapshot = snapshots.current[currentIdx - 1];
      const timeInMinutes = timeElapsed / 60000;
      const errorsDelta = Math.max(
        0,
        prevsnapshot ? errors.length - prevsnapshot.errors : errors.length
      );
      const wpm = Math.max(0, (charsTyped - errors.length) / 5 / timeInMinutes);
      setWpm(wpm);

      snapshots.current.push({
        charsTyped,
        errors: errors.length,
        errorsDelta,
        time: timeElapsed,
        rawWpm: charsTyped / 5 / timeInMinutes,
        wpm,
      });
    }
  }, [timeElapsed]);

  // useEffect(() => {
  // 	if (inputRef.current) {
  // 		inputRef.current.addEventListener("keydown", keyboardHandler);
  // 	}

  // 	return () => {
  // 		if (inputRef.current) {
  // 			inputRef.current.removeEventListener("keydown", keyboardHandler);
  // 		}
  // 	};
  // }, [keyboardHandler, isFocused]);

  useEffect(() => {
    window.addEventListener("keydown", keyboardHandler);

    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [keyboardHandler]);

  return {
    chars,
    currentChar,
    charsTyped,
    errors,
    isOver,
    actualWords,
    isFocused,
    setIsFocused,
    inputRef,
    reset,
    timeElapsed,
    snapshots,
    extraChars,
    wpm,
  };
};
