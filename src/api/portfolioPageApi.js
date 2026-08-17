// src/api/portfolioPageApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("API_BASE_URL:", API_BASE_URL); // Debugging line to check the value of API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const portfolioPageApi = {
  /**
   * Get portfolio page data (Public)
   */
  getPage: async () => {
    try {
      const response = await apiClient.get("/portfolio-page");
      return response.data;
    } catch (error) {
      console.error("Error fetching portfolio page:", error);
      throw error;
    }
  },

  /**
   * Get portfolio page images only (Public)
   */
  getImages: async () => {
    try {
      const response = await apiClient.get("/portfolio-page/page-images");
      return response.data;
    } catch (error) {
      console.error("Error fetching portfolio page images:", error);
      throw error;
    }
  },
};
