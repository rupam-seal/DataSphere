import React, { useState, useEffect } from "react";
import "./index.css";
import InsightsService from "../../Services/InsightsService";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import LineChart from "../../components/Chart/LineChart";
import BarChart from "../../components/Chart/BarChart";
import { sortYears } from "../../utils/InsightsUtils";
import { extractYears } from "../../utils/YearUtils";
import { FaBolt } from "react-icons/fa";
import { RiRoadMapFill } from "react-icons/ri";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { HiTrendingUp, HiLocationMarker } from "react-icons/hi";
import {
  getChartData,
  getChartDataForCategory,
  getYearData,
} from "../../utils/ChartDataUtils";
import PieChart from "../../components/Chart/PieChart";
import { Selector } from "../../components/Selector";

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
  const filters = [{ value: "Year", label: "Year" }];

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
          <Selector options={filters} defaultValue={[]} onChange={() => {}} />
        </div>
        <div className="select">
          <Selector
            options={options}
            defaultValue={{ label: "All Sectors", value: "" }}
            onChange={handleSectorChange}
          />
        </div>
        <div className="select">
          <Selector
            options={years}
            defaultValue={{ label: "All Years", value: "" }}
            onChange={handleYearChange}
          />
        </div>
      </div>
      <div className="chart__canvas">
        <BarChart
          data={getChartData(filteredInsights, sortedYears, "intensity")}
          title={"Intensity"}
        >
          <FaBolt />
        </BarChart>
        <BarChart
          data={getChartData(filteredInsights, sortedYears, "likelihood")}
          title={"Likelihood"}
        >
          <AiFillLike />
        </BarChart>
        <BarChart
          data={getChartData(filteredInsights, sortedYears, "relevance")}
          title={"Relevance"}
        >
          <HiTrendingUp />
        </BarChart>
        <LineChart
          data={getYearData(filteredInsights, sortedYears)}
          title={"Year"}
        >
          <MdOutlineAccessTimeFilled />
        </LineChart>
        <PieChart
          data={getChartDataForCategory(filteredInsights, "country")}
          title={"Country"}
        >
          <HiLocationMarker />
        </PieChart>
        <PieChart
          data={getChartDataForCategory(filteredInsights, "topic")}
          title={"Topic"}
        >
          <MdOutlineLocalFireDepartment />
        </PieChart>
        <PieChart
          data={getChartDataForCategory(filteredInsights, "region")}
          title={"Region"}
        >
          <RiRoadMapFill />
        </PieChart>
      </div>
    </div>
  );
};
