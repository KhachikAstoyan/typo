import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Theme, ThemeContext } from "@emotion/react";
import { roundToTen } from "@/utils";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  snapshots: ISnapshot[];
}

export const TypingChart: React.FC<ChartProps> = ({ snapshots }) => {
  const theme: Theme = useContext(ThemeContext) as Theme;

  return (
    <div className="w-full">
      <Line
        height={300}
        options={{
          responsive: true,
          interaction: {
            intersect: false,
            mode: "index",
          },
          maintainAspectRatio: false,
          scales: {
            // @ts-ignore
            A: {
              type: "linear",
              position: "left",
              min: roundToTen(
                Math.min(
                  ...snapshots.map((snapshot) =>
                    snapshot.rawWpm >= snapshot.wpm
                      ? snapshot.rawWpm
                      : snapshot.wpm
                  )
                ) - 30
              ),
              max: roundToTen(
                Math.max(
                  ...snapshots.map((snapshot) =>
                    snapshot.rawWpm >= snapshot.wpm
                      ? snapshot.rawWpm
                      : snapshot.wpm
                  )
                ) + 20
              ),
            },
            B: {
              type: "linear",
              min: 0,
              position: "right",
              ticks: {
                stepSize: 1,
              },
            },
          },
          plugins: {},
        }}
        data={{
          labels: snapshots.map((snapshot) => {
            return Math.floor(snapshot.time / 1000);
          }),
          datasets: [
            {
              label: "Raw WPM",
              data: snapshots.map((snapshot) => snapshot.rawWpm),
              borderColor: "rgb(49, 49, 49)",
              yAxisID: "A",
              tension: 0.3,
            },
            {
              label: "WPM",
              data: snapshots.map((snapshot) => snapshot.wpm),
              yAxisID: "A",
              borderColor: theme.primary,
              tension: 0.3,
            },
            {
              label: "Errors",
              data: snapshots.map((snapshot) => snapshot.errorsDelta || null),
              borderColor: "rgb(235, 53, 53)",

              yAxisID: "B",
              showLine: false,
            },
          ],
        }}
      />
    </div>
  );
};
