import {
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
