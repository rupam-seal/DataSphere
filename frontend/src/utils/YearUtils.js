export const extractYears = (data) => {
  return data
    .map((insight) => new Date(insight.published).getFullYear())
    .filter((year) => !isNaN(year));
};

export const extractEndYears = (data) => {
  return data
    .map((insight) => insight.end_year)
    .filter((year) => year !== "" && !isNaN(year));
};

export const extractStartYears = (data) => {
  return data
    .map((insight) => insight.start_year)
    .filter((year) => year !== "" && !isNaN(year));
};
