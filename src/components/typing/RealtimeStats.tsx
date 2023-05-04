import React from "react";
import styled from "@emotion/styled";
import { useSettings } from "../../store/settings";

interface RealtimeStatsProps {
  time: number;
  wpm: number;
  actualWords: number;
}

interface SettingProps {
  active?: boolean;
}

const TestSettingsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -90%);
  background-color: ${(p) => p.theme.bgSecondary};
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  display: flex;
  gap: 10px;
`;

const Separator = styled.div`
  display: inline-block;
  width: 3px;
  background-color: #1b1b1b;
  border-radius: 4px;
`;

const Stat = styled.span`
  color: ${(p) => p.theme.primary};
`;

const StatDisplay: React.FC<{ stat?: any; value: any }> = ({ stat, value }) => {
  return (
    <span>
      {stat ? stat : ""} <Stat>{value}</Stat>
    </span>
  );
};

const RealtimeStats: React.FC<RealtimeStatsProps> = ({
  actualWords,
  time,
  wpm,
}) => {
  const settings = useSettings();

  return (
    <TestSettingsWrapper>
      {settings.testMode === "words" && (
        <StatDisplay value={`${actualWords}/${settings.wordCount}`} />
      )}
      <StatDisplay
        stat="time"
        value={
          settings.testMode === "time"
            ? Math.round(settings.time - time)
            : Math.round(time)
        }
      />
      <StatDisplay stat="wpm" value={Math.round(wpm)} />
    </TestSettingsWrapper>
  );
};

export default RealtimeStats;
