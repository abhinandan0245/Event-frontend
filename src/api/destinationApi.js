import axios from "axios";

// Define your backend base URL (adjust this to match your actual backend URL)
const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "https://violin-server.onrender.com/api";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Destination API service
export const destinationApi = {
  /**
   * Fetch all destinations (Public)
   */
  //   getAll: async () => {
  //     try {
  //       const response = await apiClient.get("/destinations");
  //       return response.data; // Returns { success: true, data: [...] }
  //     } catch (error) {
  //       console.error("Error fetching destinations:", error);
  //       throw error;
  //     }
  //   },

  // FIX: Added 'filters' parameter
  getAll: async (filters = {}) => {
    try {
      // FIX: Pass filters as query params
      const response = await apiClient.get("/destinations", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      throw error;
    }
  },

  /**
   * Fetch featured destinations (Public)
   */
  getFeatured: async () => {
    try {
      const response = await apiClient.get("/destinations/featured");
      return response.data;
    } catch (error) {
      console.error("Error fetching featured destinations:", error);
      throw error;
    }
  },

  /**
   * Fetch a single destination by ID (Public)
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching destination ${id}:`, error);
      throw error;
    }
  },
};