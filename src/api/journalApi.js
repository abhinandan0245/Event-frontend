// src/api/journalApi.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "https://violin-server.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const journalApi = {
  // Public endpoints
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get("/journal", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching journal items:", error);
      throw error;
    }
  },

  getFeatured: async () => {
    try {
      const response = await apiClient.get("/journal/featured");
      return response.data;
    } catch (error) {
      console.error("Error fetching featured items:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await apiClient.get("/journal/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/journal/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },





 
};