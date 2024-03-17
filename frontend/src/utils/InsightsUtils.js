export const getMonthsInYear = () => {
  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(
      new Date(2000, i - 1, 1).toLocaleString("default", { month: "long" })
    );
  }
  return months;
};

export const getInsightDataForMonths = (filteredInsights, attribute) => {
  const data = new Array(12).fill(0);
  filteredInsights.forEach((insight) => {
    const publishedDate = new Date(insight.published);
    if (!isNaN(publishedDate)) {
      const monthIndex = publishedDate.getMonth();
      data[monthIndex] += parseInt(insight[attribute]);
    }
  });
  return data;
};

export const getInsightCountByYear = (filteredInsights, sortedYears) => {
  const insightCountByYear = {};
  sortedYears.forEach((year) => {
    insightCountByYear[year] = 0;
  });
  filteredInsights.forEach((insight) => {
    const year = new Date(insight.published).getFullYear();
    insightCountByYear[year]++;
  });
  return sortedYears.map((year) => insightCountByYear[year]);
};

export const sortYears = (years) => {
  return [...new Set(years)].sort((a, b) => a - b);
};

export const getInsightCountByCategory = (filteredInsights, category) => {
  const insightCountByCategory = {};
  filteredInsights.forEach((insight) => {
    const categoryValue = insight[category];
    insightCountByCategory[categoryValue] =
      (insightCountByCategory[categoryValue] || 0) + 1;
  });
  return insightCountByCategory;
};
