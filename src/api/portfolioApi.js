// src/api/portfolioApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const portfolioApi = {
  // ✅ Get all portfolio items with pagination
  getAll: async (filters = {}) => {
    try {
      try {
        const response = await apiClient.get("/portfolio", { params: filters });
        return response.data;
      } catch (err) {
        const response = await apiClient.get("/portfolios", {
          params: filters,
        });
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      throw error;
    }
  },

  // ✅ Get ALL featured items (no limit)
  getFeatured: async () => {
    try {
      try {
        const response = await apiClient.get("/portfolio/featured");
        return response.data;
      } catch (err) {
        const response = await apiClient.get("/portfolios/featured");
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching featured portfolio items:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      try {
        const response = await apiClient.get(`/portfolio/${id}`);
        return response.data;
      } catch (err) {
        const response = await apiClient.get(`/portfolios/${id}`);
        return response.data;
      }
    } catch (error) {
      console.error(`Error fetching portfolio item ${id}:`, error);
      throw error;
    }
  },

  // ✅ Get videos with pagination
  getVideos: async (params = {}) => {
    try {
      try {
        const response = await apiClient.get("/portfolio/videos", { params });
        return response.data;
      } catch (err) {
        const response = await apiClient.get("/portfolios/videos", { params });
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching portfolio videos:", error);
      throw error;
    }
  },
};