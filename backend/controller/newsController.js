//api from external for news
import dotenv from "dotenv";

dotenv.config();
const key = process.env.NEWS_API_KEY;
export const getNews = async (req, res) => {
  try {
    const page = req.query.page || 1; // Default to page 1 if not provided
    const pageSize = req.query.pageSize || 10; // Default to 10 items per page

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}&page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

//get top headlines
export const getTopHeadlines = async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    res.status(500).json({ error: "Failed to fetch top headlines" });
  }
}
//get news by category
export const getNewsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news by category:", error);
    res.status(500).json({ error: "Failed to fetch news by category" });
  }
}
