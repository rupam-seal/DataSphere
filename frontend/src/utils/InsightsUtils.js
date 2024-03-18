export const getMonthsInYear = () => {
  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(
      new Date(2000, i - 1, 1).toLocaleString("default", { month: "long" })
    );
  }

  console.log("====================================");
  console.log("getMonthsInYear", months);
  console.log("====================================");
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
  console.log("====================================");
  console.log("getInsightDataForMonths", data);
  console.log("====================================");
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

  const data = sortedYears.map((year) => insightCountByYear[year]);
  console.log("====================================");
  console.log("getInsightCountByYear", data);
  console.log("====================================");
  return data;
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

  console.log("====================================");
  console.log("getInsightCountByCategory", insightCountByCategory);
  console.log("====================================");
  return insightCountByCategory;
};
