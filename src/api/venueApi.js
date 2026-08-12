import axios from "axios";

// Define your backend base URL
const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "https://violin-server.onrender.com/api";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const venueApi = {
  /**
   * Fetch all venues with optional filters
   * @param {Object} filters - Query parameters like location, capacity, etc.
   */
  getAll: async (filters = {}) => {
    try {
      const response = await apiClient.get("/venues", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw error;
    }
  },

  /**
   * Fetch featured venues
   */
  getFeatured: async () => {
    try {
      const response = await apiClient.get("/venues/featured");
      return response.data;
    } catch (error) {
      console.error("Error fetching featured venues:", error);
      throw error;
    }
  },

  /**
   * Fetch a single venue by its ID
   * @param {string} id - The MongoDB ObjectId of the venue
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/venues/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching venue ${id}:`, error);
      throw error;
    }
  },
};