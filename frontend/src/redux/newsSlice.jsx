import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/news";
const topNewsURL = import.meta.env.VITE_BACKEND_URL + "/news/top-headlines"; // URL for top headlines
const topHealthNewsURL =
  import.meta.env.VITE_BACKEND_URL + "/news/top-health-headlines"; // URL for top health headlines

// Thunk for fetching news
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ page = 1, pageSize = 10 }) => {
    const res = await axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`);
    return res.data;
  }
);

//thunk for fetching news of top headlines
export const fetchTopHeadlines = createAsyncThunk(
  "news/fetchTopHeadlines",
  async () => {
    const res = await axios.get(`${topNewsURL}`);
    return res.data;
  }
);

//thunks for fetching top health headlines
export const fetchTopHealthHeadlines = createAsyncThunk(
  "news/fetchTopHealthHeadlines",
  async () => {
    const res = await axios.get(`${topHealthNewsURL}`);
    return res.data;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [], // Main paginated news
    totalResults: 0,
    headlines: [], // Top headlines
    categoryNews: [], // Category-specific news
    loading: false,
    error: null,
    currentPage: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Main News
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Top Headlines
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.loading = false;
        state.headlines = action.payload.articles; // Store in headlines, NOT articles
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = newsSlice.actions;
export default newsSlice.reducer;
