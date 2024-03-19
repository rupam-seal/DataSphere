import axios from "axios";

class InsightsService {
  static async fetchInsights() {
    try {
      const response = await axios.get(
        "https://datasphere-admin.vercel.app/api/insights/?page_size=1000"
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching insights:", error);
      throw error;
    }
  }

  static async fetchInsightsByPage(page = 1) {
    try {
      const response = await axios.get(
        `https://datasphere-admin.vercel.app/api/insights/?page=${page}`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching insights:", error);
      throw error;
    }
  }

  static filterInsights(
    insights,
    selectedSector,
    selectedYear,
    selectedTopic,
    selectedRegion,
    selectedCountry,
    selectedPestle
  ) {
    return insights.filter((insight) => {
      const insightYear = new Date(insight.published).getFullYear();
      return (
        (!selectedSector ||
          insight.sector
            .toLowerCase()
            .includes(selectedSector.toLowerCase())) &&
        (!selectedYear || insightYear === parseInt(selectedYear)) &&
        (!selectedTopic ||
          insight.topic.toLowerCase().includes(selectedTopic.toLowerCase())) &&
        (!selectedRegion ||
          insight.region
            .toLowerCase()
            .includes(selectedRegion.toLowerCase())) &&
        (!selectedCountry ||
          insight.country
            .toLowerCase()
            .includes(selectedCountry.toLowerCase())) &&
        (!selectedPestle ||
          insight.pestle.toLowerCase().includes(selectedPestle.toLowerCase()))
      );
    });
  }

  static findTopInsights(insights, numTopInsights) {
    const calculateScore = (insight) => {
      const weights = {
        intensity: 1,
        relevance: 0.8,
        likelihood: 0.5,
      };

      let score = 0;
      for (const attribute in weights) {
        score += insight[attribute] * weights[attribute];
      }
      return score;
    };

    const insightsWithScores = insights.map((insight) => ({
      ...insight,
      score: calculateScore(insight),
    }));

    const sortedInsights = insightsWithScores.sort((a, b) => b.score - a.score);

    const topInsights = sortedInsights.slice(0, numTopInsights);

    return topInsights;
  }
}

export default InsightsService;
