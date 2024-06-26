import {
  getInsightCountByCategory,
  getInsightCountByYear,
  getInsightDataForMonths,
  getMonthsInYear,
} from "./InsightsUtils";

export const getChartData = (filteredInsights, sortedYears, attribute) => {
  const data = getInsightDataForMonths(filteredInsights, attribute).map(
    (value) => (isNaN(value) ? "NA" : value)
  );
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
        data: data,
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
        borderColor: "rgb(30, 0, 255, 0.6)",
        backgroundColor: "rgba(30, 0, 255, 0.2)",
        tension: 0.1,
      },
    ],
  };
};

export const getChartDataForCategory = (filteredInsights, category) => {
  const insightCountByCategory = getInsightCountByCategory(
    filteredInsights,
    category
  );

  const labels = Object.keys(insightCountByCategory).map((label) =>
    label.trim() === "" ? "NA" : label
  );
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

export const getSWOTChartData = (swotCounts) => {
  const { strengthsCount, weaknessesCount, opportunitiesCount, threatsCount } =
    swotCounts;

  return {
    labels: ["Strengths", "Weaknesses", "Opportunities", "Threats"],
    datasets: [
      {
        label: "SWOT Analysis",
        data: [
          strengthsCount,
          weaknessesCount,
          opportunitiesCount,
          threatsCount,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
