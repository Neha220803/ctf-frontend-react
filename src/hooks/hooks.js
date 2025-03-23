import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000";
const TOKEN_KEY = "auth_token";
const TEAM_ID_KEY = "team_id";

// Custom hook for handling API calls
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);
  const [teamId, setTeamId] = useState(
    localStorage.getItem(TEAM_ID_KEY) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Create an axios instance with default configs
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Add token to requests if available
  useEffect(() => {
    if (token) {
      // Explicitly include 'Bearer ' prefix for JWT token
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Token set in Authorization header with Bearer prefix");
    } else {
      delete api.defaults.headers.common["Authorization"];
      console.log("No token available, Authorization header removed");
    }
  }, [token]);

  // Improved helper function for making API requests
  const fetchApi = async (endpoint, method, data = null) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Making ${method} request to ${endpoint}`);

      const config = {
        method,
        url: endpoint,
      };

      if (data) {
        config.data = data;
      }

      // Double-check the Authorization header for this specific request
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
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
    return fetchApi("/api/signup", "POST", { email, password });
  };

  // Login function
  const login = async (email, password) => {
    const response = await fetchApi("/api/login", "POST", { email, password });

    if (response.status === "success" && response.token) {
      // Save token and team ID to localStorage
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(TEAM_ID_KEY, response.teamid);

      // Update state
      setToken(response.token);
      setTeamId(response.teamid);
      setIsAuthenticated(true);
    }

    return response;
  };

  // Logout function
  const logout = async () => {
    try {
      await fetchApi("/api/logout", "POST");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear token and team ID from localStorage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TEAM_ID_KEY);

      // Update state
      setToken(null);
      setTeamId(null);
      setIsAuthenticated(false);
    }
  };

  // Get team score
  const getTeamScore = async () => {
    return fetchApi("/api/team-score", "GET");
  };

  // Submit flag
  const submitFlag = async (data) => {
    return fetchApi("/api/submit-flag", "POST", data);
  };

  // Get leaderboard
  const getLeaderboard = async () => {
    return fetchApi("/api/leaderboard", "GET");
  };

  return {
    loading,
    error,
    isAuthenticated,
    teamId,
    signup,
    login,
    logout,
    getTeamScore,
    submitFlag,
    getLeaderboard,
  };
};

export default useApi;
