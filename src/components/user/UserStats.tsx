import { roundToDecimal, secsToReadable } from "../../utils";
import { StatCard } from "@/components/typing/StatCard";
import { useQuery } from "react-query";
import axios from "axios";
import { User } from "@prisma/client";
import { useTheme } from "@emotion/react";
import { Center } from "@mantine/core";
import { fetchStats } from "@/utils/api";

interface UserStatsProps {
  user: User;
}

export const UserStats: React.FC<UserStatsProps> = ({ user }) => {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery([`userStats`, user.id], fetchStats(user.id));

  if (isLoading) {
    return (
      <>
        <div className="flex flex-row gap-5">
          <StatSkeleton />
          <StatSkeleton />
          <StatSkeleton />
        </div>
      </>
    );
  }

  if (isError || !stats) {
    return <Center>Couldn't fetch stats;</Center>;
  }

  return (
    <>
      <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <StatCard title="Average WPM">
          {roundToDecimal(stats.avg.wpm || 0, 2)}
        </StatCard>
        <StatCard title="Max WPM">{roundToDecimal(stats.max.wpm!, 2)}</StatCard>
        <StatCard title="Average accuracy">
          {roundToDecimal(stats.avg.accuracy || 0, 2)}
          <span className="text-2xl text-gray-500">%</span>
        </StatCard>
        <StatCard title="Average time">
          {roundToDecimal((stats.avg.time || 0) / 1000, 2)}
          <span className="text-2xl text-gray-500">s</span>
        </StatCard>
        <StatCard title="Time spent typing">
          {secsToReadable((stats.totalTime || 0) / 1000)}
        </StatCard>
        <StatCard title="Tests Completed">{stats.count}</StatCard>
      </div>
    </>
  );
};

function StatSkeleton() {
  const theme = useTheme();
  return (
    <div
      className="h-28 w-full animate-pulse rounded-md"
      style={{ backgroundColor: theme.bgSecondary }}
    ></div>
  );
}
