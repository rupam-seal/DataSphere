import React, { Children } from "react";
import { Filler } from "chart.js";
import "./index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
);

const LineChart = ({ data, title, children }) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(27, 37, 75, 0.7)",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(27, 37, 75, 0.7)",
        },
      },
    },
  };

  return (
    <div className={"bar"}>
      <div className="chart__top">
        {children}
        <div className="chart__title">{title}</div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
