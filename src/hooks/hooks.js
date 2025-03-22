import { useState } from "react";
import axios from "axios";

const API_URL = "https://the-squid-hunt.vip/api";

// Custom hook for handling API calls
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create an axios instance with default configs
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Improved helper function for making API requests
  const fetchApi = async (endpoint, method, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method,
        url: endpoint,
      };

      if (data) {
        config.data = data;
      }

      const response = await api(config);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
      setLoading(false);
      throw err;
    }
  };

  // Signup function
  const signup = async (email, password) => {
    return fetchApi("/signup", "POST", { email, password });
  };

  // Login function
  const login = async (email, password) => {
    return fetchApi("/login", "POST", { email, password });
  };

  // Logout function
  const logout = async () => {
    return fetchApi("/logout", "GET");
  };

  // Get team score
  const getTeamScore = async () => {
    return fetchApi("/team-score", "GET");
  };

  // Submit flag
  const submitFlag = async (data) => {
    return fetchApi("/submit-flag", "POST", data);
  };

  // Get leaderboard
  const getLeaderboard = async () => {
    return fetchApi("/leaderboard", "GET");
  };

  return {
    loading,
    error,
    signup,
    login,
    logout,
    getTeamScore,
    submitFlag,
    getLeaderboard,
  };
};

export default useApi;
