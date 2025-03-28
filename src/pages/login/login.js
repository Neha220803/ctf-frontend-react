import React, { useState } from "react";
import "./login.css";
import loginVig from "../../assets/videos/loginvideo.mp4";
import useApi from "../../hooks/hooks"; // Adjust the path as needed
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { loading, error, login } = useApi(); // Use the login hook
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password);

      if (result.status === "success") {
        // Store teamId and token in localStorage
        localStorage.setItem("teamId", result.teamid);
        localStorage.setItem("auth_token", result.token); // Store JWT token

        // Redirect to dashboard using React Router
        navigate("/dashboard/home");
      } else {
        setMessage(result.message || "Login failed");
      }
    } catch (err) {
      setMessage(error || "An error occurred during login");
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop id="bg-video">
        <source src={loginVig} type="video/mp4" />
        Your browser does not support the video.
      </video>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-xl mb-4">Login</h2>

          {/* Display error message if any */}
          {message && (
            <div className="error-message mb-4 text-red-500">{message}</div>
          )}

          <label className="mb-2">User Name:</label>
          <input
            type="text"
            placeholder="Enter your User name"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />

          <label className="mb-2">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
