// src/api/artistPublicApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const artistPublicApi = {
  /**
   * Fetch all artist categories
   */
  getCategories: async () => {
    try {
      const response = await apiClient.get("/artist-categories/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching artist categories:", error);
      throw error;
    }
  },

  /**
   * Fetch all artists with optional filters
   * @param {Object} filters - Query parameters like category, featured, etc.
   */
  getArtists: async (filters = {}) => {
    try {
      const response = await apiClient.get("/artists", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching artists:", error);
      throw error;
    }
  },

  /**
   * Fetch featured artists
   */
  getFeaturedArtists: async () => {
    try {
      const response = await apiClient.get("/artists/featured");
      return response.data;
    } catch (error) {
      console.error("Error fetching featured artists:", error);
      throw error;
    }
  },

  /**
   * Fetch artists by category
   * @param {string} categoryId - The category ID
   */
  getArtistsByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get(`/artists/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching artists for category ${categoryId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch a single artist by ID
   * @param {string} id - The artist ID
   */
  getArtistById: async (id) => {
    try {
      const response = await apiClient.get(`/artists/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching artist ${id}:`, error);
      throw error;
    }
  },
};