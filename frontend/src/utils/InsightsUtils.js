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
      const attributeValue = parseInt(insight[attribute]);
      if (!isNaN(attributeValue)) {
        data[monthIndex] += attributeValue;
      }
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

  const data = sortedYears.map((year) => insightCountByYear[year]);
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
  return insightCountByCategory;
};

export const getSWOTAnalysis = (filteredInsights, selectedSwot) => {
  let strengthsCount = 0;
  let weaknessesCount = 0;
  let opportunitiesCount = 0;
  let threatsCount = 0;

  filteredInsights.forEach((entry) => {
    const intensity = parseInt(entry.intensity);
    const relevance = parseInt(entry.relevance);
    const likelihood = parseInt(entry.likelihood);

    if (!isNaN(intensity) && !isNaN(relevance) && !isNaN(likelihood)) {
      if (intensity >= 6) {
        if (likelihood >= 3) {
          strengthsCount++;
        } else if (likelihood <= 2) {
          weaknessesCount++;
        }
      }
      if (relevance >= 3) {
        if (likelihood >= 3) {
          opportunitiesCount++;
        } else if (likelihood <= 2) {
          threatsCount++;
        }
      }
    }
  });

  if (selectedSwot === "Strength") {
    weaknessesCount = 0;
    opportunitiesCount = 0;
    threatsCount = 0;
  } else if (selectedSwot === "Weakness") {
    strengthsCount = 0;
    opportunitiesCount = 0;
    threatsCount = 0;
  } else if (selectedSwot === "Opportunities") {
    strengthsCount = 0;
    weaknessesCount = 0;
    threatsCount = 0;
  } else if (selectedSwot === "Threats") {
    strengthsCount = 0;
    weaknessesCount = 0;
    opportunitiesCount = 0;
  }

  return { strengthsCount, weaknessesCount, opportunitiesCount, threatsCount };
};
