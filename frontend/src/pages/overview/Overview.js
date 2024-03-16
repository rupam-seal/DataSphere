import React, { useState, useEffect } from "react";
import "./index.css";
import InsightsService from "../../Services/InsightsService";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import LineChart from "../../components/Chart/LineChart";
import BarChart from "../../components/Chart/BarChart";
import { sortYears } from "../../utils/InsightsUtils";
import { extractYears } from "../../utils/YearUtils";
import { getChartData, getYearData } from "../../utils/ChartDataUtils";
import Select from "react-select";

export const Overview = () => {
  const [insights, setInsights] = useState([]);
  const [filteredInsights, setFilteredInsights] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortedYears, setSortedYears] = useState([]);
  const { sectors } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await InsightsService.fetchInsights();
        setInsights(data);
        setFilteredInsights(data);
        const years = extractYears(data);
        setSortedYears(sortYears(years));
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filteredData = InsightsService.filterInsights(
        insights,
        selectedSector,
        selectedYear
      );
      setFilteredInsights(filteredData);
    };
    applyFilters();
  }, [insights, selectedSector, selectedYear, sortedYears]);

  const handleSectorChange = (event) => {
    setSelectedSector(event.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.value);
  };

  const options = [{ value: "", label: "All Sectors" }];
  const years = [{ value: "", label: "All Years" }];
  const filters = [
    { value: "Year", label: "Year" },
    { value: "SWOT", label: "SWOT" },
  ];

  sectors.forEach((sector) => {
    if (sector !== "") {
      options.push({ value: sector, label: sector });
    }
  });

  sortedYears.forEach((year) => {
    years.push({ value: year, label: year });
  });

  return (
    <div style={{ marginTop: "90px" }}>
      <div className="select__container">
        <div className="select-multi">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: "12px",
                borderColor: "rgba(27, 37, 75, 0.1)",
              }),
              indicatorSeparator: (base) => ({
                ...base,
                backgroundColor: "rgba(27, 37, 75, 0.1)",
              }),
              menuPortal: (base) => ({
                ...base,
                fontSize: "12px",
              }),
            }}
            options={filters}
            isMulti
          />
        </div>
        <div className="select">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: "12px",
                borderColor: "rgba(27, 37, 75, 0.1)",
              }),
              indicatorSeparator: (base) => ({
                ...base,
                backgroundColor: "rgba(27, 37, 75, 0.1)",
              }),
              menuPortal: (base) => ({
                ...base,
                fontSize: "12px",
              }),
            }}
            defaultValue={{ label: "All Sectors", value: "" }}
            options={options}
            onChange={handleSectorChange}
          />
        </div>
        <div className="select">
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: "12px",
                borderColor: "rgba(27, 37, 75, 0.1)",
              }),
              indicatorSeparator: (base) => ({
                ...base,
                backgroundColor: "rgba(27, 37, 75, 0.1)",
              }),
              menuPortal: (base) => ({
                ...base,
                fontSize: "12px",
              }),
            }}
            defaultValue={{ label: "All Years", value: "" }}
            options={years}
            onChange={handleYearChange}
          />
        </div>
      </div>
      <div className="chart__canvas">
        <LineChart data={getYearData(filteredInsights, sortedYears)} />
        <BarChart
          data={getChartData(filteredInsights, sortedYears, "intensity")}
        />
        <BarChart
          data={getChartData(filteredInsights, sortedYears, "likelihood")}
        />
        <BarChart
          data={getChartData(filteredInsights, sortedYears, "relevance")}
        />
      </div>
    </div>
  );
};
