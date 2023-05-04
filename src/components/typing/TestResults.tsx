import React, { PropsWithChildren, useContext } from "react";
import { TypingChart } from "./TypingChart";
import { StatCard } from "./StatCard";

interface TestResultProps {
  snapshots: ISnapshot[];
  wpm: number;
  time: number;
  errors: number;
  accuracy: number;
}

const TestResults: React.FC<TestResultProps> = ({
  snapshots,
  wpm,
  time,
  errors,
  accuracy,
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-4 gap-2">
        <StatCard title="time">
          {time}
          <span className="text-2xl text-gray-500">s</span>
        </StatCard>
        <StatCard title="wpm">{wpm}</StatCard>
        <StatCard title="errors">{errors}</StatCard>
        <StatCard title="accuracy">
          {accuracy}
          <span className="text-2xl text-gray-500">%</span>
        </StatCard>
      </div>
      <TypingChart snapshots={snapshots} />
    </div>
  );
};

export default TestResults;
