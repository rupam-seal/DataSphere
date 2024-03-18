import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data, title, children }) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className={"pie"}>
      <div className="chart__top">
        {children}
        <div className="chart__title">{title}</div>
      </div>
      <Pie options={options} data={data} />
    </div>
  );
};

export default PieChart;
