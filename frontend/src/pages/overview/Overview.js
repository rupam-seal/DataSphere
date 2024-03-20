import React, { useState, useEffect } from "react";
import "./index.css";
import InsightsService from "../../Services/InsightsService";
import { useGlobalContext } from "../../contexts/GlobalProvider";
import LineChart from "../../components/Chart/LineChart";
import BarChart from "../../components/Chart/BarChart";
import { getSWOTAnalysis, sortYears } from "../../utils/InsightsUtils";
import {
  extractEndYears,
  extractStartYears,
  extractYears,
} from "../../utils/YearUtils";
import { FaBolt } from "react-icons/fa";
import { RiRoadMapFill } from "react-icons/ri";
import { MdOutlineLocalFireDepartment, MdAnalytics } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { HiTrendingUp, HiLocationMarker } from "react-icons/hi";
import {
  getChartData,
  getChartDataForCategory,
  getSWOTChartData,
  getYearData,
} from "../../utils/ChartDataUtils";
import PieChart from "../../components/Chart/PieChart";
import { Selector } from "../../components/Selector";

export const Overview = () => {
  const [insights, setInsights] = useState([]);
  const [filteredInsights, setFilteredInsights] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPestle, setSelectedPestle] = useState("");
  const [selectedSwot, setSelectedSwot] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sortedPublishedYears, setPublishedYears] = useState([]);
  const [sortedEndYears, setSortedEndYears] = useState([]);
  const [sortedStartYears, setSortedStartYears] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Published Year");
  const { sectors } = useGlobalContext();
  const [swotCounts, setSWOTCounts] = useState({
    strengthsCount: 0,
    weaknessesCount: 0,
    opportunitiesCount: 0,
    threatsCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await InsightsService.fetchInsights();
        setInsights(data);
        setFilteredInsights(data);
        const years = extractYears(data);
        setPublishedYears(sortYears(years));
        const startYears = extractStartYears(data);
        setSortedStartYears(sortYears(startYears));
        const endYears = extractEndYears(data);
        setSortedEndYears(sortYears(endYears));
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const {
      strengthsCount,
      weaknessesCount,
      opportunitiesCount,
      threatsCount,
    } = getSWOTAnalysis(filteredInsights, selectedSwot);
    setSWOTCounts({
      strengthsCount,
      weaknessesCount,
      opportunitiesCount,
      threatsCount,
    });
  }, [filteredInsights, selectedSwot]);

  useEffect(() => {
    const applyFilters = () => {
      const filteredData = InsightsService.filterInsights(
        insights,
        selectedSector,
        selectedYear,
        selectedTopic,
        selectedRegion,
        selectedCountry,
        selectedPestle,
        selectedSwot
      );
      setFilteredInsights(filteredData);
    };
    applyFilters();
  }, [
    insights,
    selectedCountry,
    selectedRegion,
    selectedSector,
    selectedTopic,
    selectedYear,
    selectedPestle,
    selectedSwot,
  ]);

  const handleSectorChange = (event) => {
    setSelectedSector(event.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.value);
  };

  const handlePestleChange = (event) => {
    setSelectedPestle(event.value);
  };

  const handleFilterChange = (event) => {
    setSelectedYear("");
    setSelectedFilter(event.value);
  };

  const handleSwotChange = (event) => {
    setSelectedSwot(event.value);
  };

  const yearFilters = [
    { value: "Published Year", label: "Published Year" },
    { value: "Start Year", label: "Start Year" },
    { value: "End Year", label: "End Year" },
  ];

  const options = [{ value: "", label: "All Sectors" }];
  const publishedYears = [{ value: "", label: "All Published Years" }];
  const startYears = [{ value: "", label: "All Start Years" }];
  const endYears = [{ value: "", label: "All End Years" }];
  const topics = [{ value: "", label: "All Topics" }];
  const regions = [{ label: "All Regions", value: "" }];
  const countries = [{ label: "All Countries", value: "" }];
  const pestles = [{ label: "All Pestles", value: "" }];
  const swot = [
    { label: "All SWOT", value: "" },
    { label: "Strength", value: "Strength" },
    { label: "Weakness", value: "Weakness" },
    { label: "Opportunities", value: "Opportunities" },
    { label: "Threats", value: "Threats" },
  ];

  sectors.forEach((sector) => {
    if (sector.trim() !== "") {
      options.push({ value: sector, label: sector });
    } else {
      options.push({ value: "NA", label: "NA" });
    }
  });

  sortedPublishedYears.forEach((year) => {
    publishedYears.push({ value: year, label: year });
  });

  const uniqueTopics = [...new Set(insights.map((insight) => insight.topic))];
  uniqueTopics.forEach((topic) => {
    if (topic.trim() !== "") {
      topics.push({ value: topic, label: topic });
    } else {
      topics.push({ value: "NA", label: "NA" });
    }
  });

  sortedEndYears.forEach((year) => {
    endYears.push({ value: year, label: year });
  });

  sortedStartYears.forEach((year) => {
    startYears.push({ value: year, label: year });
  });

  const uniqueRegions = [...new Set(insights.map((insight) => insight.region))];
  uniqueRegions.forEach((region) => {
    if (region.trim() !== "") {
      regions.push({ value: region, label: region });
    } else {
      regions.push({ value: "NA", label: "NA" });
    }
  });

  const uniqueCountries = [
    ...new Set(insights.map((insight) => insight.country)),
  ];
  uniqueCountries.forEach((country) => {
    if (country.trim() !== "") {
      countries.push({ value: country, label: country });
    } else {
      countries.push({ value: "NA", label: "NA" });
    }
  });

  const uniquePestle = [...new Set(insights.map((insight) => insight.pestle))];
  uniquePestle.forEach((pestle) => {
    if (pestle.trim() !== "") {
      pestles.push({ value: pestle, label: pestle });
    } else {
      pestles.push({ value: "NA", label: "NA" });
    }
  });

  return (
    <div style={{ marginTop: "9rem" }}>
      <div className="select__container">
        <div className="select-multi">
          <Selector
            options={yearFilters}
            defaultValue={{
              value: "Published Year",
              label: "Published Year",
            }}
            onChange={handleFilterChange}
          />
        </div>
        {selectedFilter === "Published Year" && (
          <div className="select">
            <Selector
              options={publishedYears}
              defaultValue={{ label: "All Published Years", value: "" }}
              onChange={handleYearChange}
            />
          </div>
        )}
        {selectedFilter === "Start Year" && (
          <div className="select">
            <Selector
              options={startYears}
              defaultValue={{ label: "All Start Years", value: "" }}
              onChange={handleYearChange}
            />
          </div>
        )}
        {selectedFilter === "End Year" && (
          <div className="select">
            <Selector
              options={endYears}
              defaultValue={{ label: "All End Years", value: "" }}
              onChange={handleYearChange}
            />
          </div>
        )}
        <div className="divider" />
        <div className="select">
          <Selector
            options={options}
            defaultValue={{ label: "All Sectors", value: "" }}
            onChange={handleSectorChange}
          />
        </div>
        <div className="select">
          <Selector
            options={topics}
            defaultValue={{ label: "All Topics", value: "" }}
            onChange={handleTopicChange}
          />
        </div>
        <div className="select">
          <Selector
            options={regions}
            defaultValue={{ label: "All Regions", value: "" }}
            onChange={handleRegionChange}
          />
        </div>
        <div className="select">
          <Selector
            options={countries}
            defaultValue={{ label: "All Countries", value: "" }}
            onChange={handleCountryChange}
          />
        </div>
        <div className="select">
          <Selector
            options={pestles}
            defaultValue={{ label: "All Pestles", value: "" }}
            onChange={handlePestleChange}
          />
        </div>
        <div className="select">
          <Selector
            options={swot}
            defaultValue={{ label: "All SWOT", value: "" }}
            onChange={handleSwotChange}
          />
        </div>
      </div>
      <div className="chart__canvas">
        <div className="chart">
          <LineChart
            data={
              selectedFilter === "Published Year"
                ? getYearData(filteredInsights, sortedPublishedYears)
                : selectedFilter === "Start Year"
                ? getYearData(filteredInsights, sortedStartYears)
                : selectedFilter === "End Year"
                ? getYearData(filteredInsights, sortedEndYears)
                : null
            }
            title={"Year"}
          >
            <MdOutlineAccessTimeFilled />
          </LineChart>
          <BarChart
            data={getSWOTChartData(swotCounts, selectedSwot)}
            title={"SWOT Analysis"}
          >
            <MdAnalytics />
          </BarChart>
        </div>
        <div className="chart">
          <BarChart
            data={
              selectedFilter === "Published Year"
                ? getChartData(
                    filteredInsights,
                    sortedPublishedYears,
                    "intensity"
                  )
                : selectedFilter === "Start Year"
                ? getChartData(filteredInsights, sortedStartYears, "intensity")
                : selectedFilter === "End Year"
                ? getYearData(filteredInsights, sortedEndYears)
                : null
            }
            title={"Intensity"}
          >
            <FaBolt />
          </BarChart>
          <PieChart
            data={getChartDataForCategory(filteredInsights, "country")}
            title={"Country"}
          >
            <HiLocationMarker />
          </PieChart>
        </div>
        <div className="chart">
          <PieChart
            data={getChartDataForCategory(filteredInsights, "topic")}
            title={"Topic"}
          >
            <MdOutlineLocalFireDepartment />
          </PieChart>
          <BarChart
            data={
              selectedFilter === "Published Year"
                ? getChartData(
                    filteredInsights,
                    sortedPublishedYears,
                    "likelihood"
                  )
                : selectedFilter === "Start Year"
                ? getChartData(filteredInsights, sortedStartYears, "likelihood")
                : selectedFilter === "End Year"
                ? getYearData(filteredInsights, sortedEndYears)
                : null
            }
            title={"Likelihood"}
          >
            <AiFillLike />
          </BarChart>
        </div>
        <div className="chart">
          <BarChart
            data={
              selectedFilter === "Published Year"
                ? getChartData(
                    filteredInsights,
                    sortedPublishedYears,
                    "relevance"
                  )
                : selectedFilter === "Start Year"
                ? getChartData(filteredInsights, sortedEndYears, "relevance")
                : selectedFilter === "End Year"
                ? getYearData(filteredInsights, sortedEndYears)
                : null
            }
            title={"Relevance"}
          >
            <HiTrendingUp />
          </BarChart>
          <PieChart
            data={getChartDataForCategory(filteredInsights, "region")}
            title={"Region"}
          >
            <RiRoadMapFill />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
