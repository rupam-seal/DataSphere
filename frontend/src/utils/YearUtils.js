export const extractYears = (data) => {
  return data
    .map((insight) => new Date(insight.published).getFullYear())
    .filter((year) => !isNaN(year));
};
