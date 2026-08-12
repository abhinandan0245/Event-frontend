// src/api/contactApi.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "https://violin-server.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const contactApi = {
  submit: async (data) => {
    try {
      const response = await apiClient.post("/contacts", data);
      return response.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  },
};
