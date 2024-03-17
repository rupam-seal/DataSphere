import {
  getInsightCountByCategory,
  getInsightCountByYear,
  getInsightDataForMonths,
  getMonthsInYear,
} from "./InsightsUtils";

export const getChartData = (filteredInsights, sortedYears, attribute) => {
  return {
    labels: getMonthsInYear(),
    datasets: [
      {
        label: attribute,
        fill: true,
        borderColor: "rgba(30, 0, 255, 0.8)",
        backgroundColor: "rgba(30, 0, 255, 0.5)",
        borderWidth: 2,
        borderRadius: 2,
        data: getInsightDataForMonths(filteredInsights, attribute),
      },
    ],
  };
};

export const getYearData = (filteredInsights, sortedYears) => {
  return {
    labels: sortedYears,
    datasets: [
      {
        label: "Insight Count by Year",
        data: getInsightCountByYear(filteredInsights, sortedYears),
        fill: true,
        borderWidth: 2,
        borderColor: "rgb(6, 195, 255, 0.8)",
        backgroundColor: "rgba(6, 195, 255, 0.5)",
      },
    ],
  };
};

export const getChartDataForCategory = (filteredInsights, category) => {
  const insightCountByCategory = getInsightCountByCategory(
    filteredInsights,
    category
  );
  const labels = Object.keys(insightCountByCategory);
  const data = Object.values(insightCountByCategory);

  return {
    labels: labels,
    datasets: [
      {
        label: "Insight Count",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(245, 10, 86, 0.6)",
          "rgba(20, 200, 50, 0.6)",
          "rgba(155, 200, 50, 0.6)",
          "rgba(55, 200, 250, 0.6)",
        ],
        borderColor: "rgba(255,255,255,0.8)",
        borderWidth: 2,
      },
    ],
  };
};
