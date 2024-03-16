import React, { createContext, useState, useEffect, useContext } from "react";
import InsightsService from "../Services/InsightsService";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [insights, setInsights] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [topInsights, setTopInsights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const insightsData = await InsightsService.fetchInsights();
        setInsights(insightsData);

        const sectorsSet = new Set(
          insightsData.map((insight) => insight.sector)
        );
        setSectors(Array.from(sectorsSet));

        const top4Insights = InsightsService.findTopInsights(insightsData, 4);
        setTopInsights(top4Insights);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ title, setTitle, insights, sectors, topInsights }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
