// hooks.js
import { useState } from "react";

const API_URL = "http://13.251.98.105:80";

// Custom hook for handling API calls
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function for making API requests
  const fetchApi = async (endpoint, method, body = null) => {
    setLoading(true);
    setError(null);

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        // Important for cookies/session to work
        credentials: "include",
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${API_URL}${endpoint}`, options);
      const data = await response.json();

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message || "An error occurred");
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

  // Update this function in hooks.js
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
