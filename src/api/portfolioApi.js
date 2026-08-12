// src/api/portfolioApi.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "https://violin-server.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const portfolioApi = {
  getAll: async (filters = {}) => {
    try {
      // Try both endpoints
      try {
        const response = await apiClient.get("/portfolio", { params: filters });
        return response.data;
      } catch (err) {
        // If /portfolio fails, try /portfolios
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

   getVideos: async () => {
    try {
      try {
        const response = await apiClient.get("/portfolio/videos");
        return response.data;
      } catch (err) {
        const response = await apiClient.get("/portfolios/videos");
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching portfolio videos:", error);
      throw error;
    }
  },
};
