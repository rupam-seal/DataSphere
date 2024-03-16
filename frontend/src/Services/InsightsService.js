import axios from "axios";

class InsightsService {
  static async fetchInsights() {
    try {
      const response = await axios.get(
        "https://datasphere-api.vercel.app/insights/?page_size=1000"
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching insights:", error);
      throw error;
    }
  }

  static filterInsights(insights, selectedSector, selectedYear) {
    return insights.filter((insight) => {
      const insightYear = new Date(insight.published).getFullYear();
      return (
        (!selectedSector ||
          insight.sector
            .toLowerCase()
            .includes(selectedSector.toLowerCase())) &&
        (!selectedYear || insightYear === parseInt(selectedYear))
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
