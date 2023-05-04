import React from "react";
import { useEffect, useRef } from "react";
import CharRenderer from "./CharRenderer";
import RealtimeStats from "./RealtimeStats";
import TestResults from "./TestResults";
import { useHotkeys } from "react-hotkeys-hook";
import { useTest } from "../../hooks/useTest";
import { Kbd } from "@mantine/core";

const TypingTest = () => {
  const {
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
  } = useTest();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useHotkeys("tab", (e) => {
    e.preventDefault();
    reset();
  });

  // on every focus state change,
  // focus the input element
  useEffect(() => {
    if (isFocused) {
      wrapperRef.current?.focus();
    } else {
      wrapperRef.current?.blur();
    }
  }, [isFocused]);

  return (
    <>
      <section
        tabIndex={0}
        ref={wrapperRef}
        className="outline-none"
        onFocus={() => {
          if (!isOver) {
            // inputRef.current?.focus();
            console.log("IM FOCUSING");
            setIsFocused(true);
          }
        }}
        onBlur={() => {
          setIsFocused(false);
          // inputRef.current?.blur();
        }}
      >
        <div className="relative">
          {/* <input
						type="text"
						ref={inputRef}
						className="absolute opacity-0"
						onKeyDown={(e) => {
							e.preventDefault();
							console.log(e.key);
						}}
					/> */}
          {!isFocused && !isOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
              <div className="bg-transparent text-lg text-zinc-400">
                Click to start
              </div>
            </div>
          )}
          {!isOver && (
            <>
              <RealtimeStats
                actualWords={actualWords}
                time={timeElapsed / 1000}
                wpm={wpm}
              />
              <CharRenderer
                chars={chars}
                extraChars={extraChars}
                currentChar={currentChar}
                errors={errors}
              />
            </>
          )}

          {isOver && snapshots.current.length ? (
            <>
              <TestResults
                time={Math.round(timeElapsed / 1000)}
                errors={errors.length}
                wpm={Math.round(wpm)}
                accuracy={Math.round(
                  (charsTyped * 100) / (charsTyped + errors.length)
                )}
                snapshots={snapshots.current}
              />
              <div
                className="mt-2 flex w-full justify-center text-zinc-400"
                onClick={reset}
              >
                <Kbd>Tab</Kbd> - restart
              </div>
            </>
          ) : null}
          {isOver && <></>}
        </div>
      </section>
    </>
  );
};
export default TypingTest;
