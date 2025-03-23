import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/hooks"; // Updated path if needed

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { loading, error, signup, login } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear any previous messages

    try {
      const result = await signup(email, password);
      if (result.status === "success") {
        setMessage("User created successfully!");

        // Log the user in immediately after signup
        const loginResult = await login(email, password);
        if (loginResult.status === "success") {
          setMessage(`Credentials for Team "${email}" created successfully!`);
        } else {
          setMessage(loginResult.message || "Login failed after signup.");
        }
      } else {
        setMessage(result.message || "Signup failed.");
      }
    } catch (err) {
      setMessage(error || "An error occurred during signup.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex-column align-items-center">
        <fieldset disabled={loading}>
          <label>User Name:</label>
          <input
            type="text"
            placeholder="Enter team name"
            required
            className="mb-4 bg-dark text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            className="mb-4 bg-dark text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </fieldset>
      </form>

      {/* Display success/error message */}
      {message && (
        <div
          className={`alert ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          } mt-3`}
        >
          {message}
        </div>
      )}

      {/* Show error from useApi if present */}
      {error && !message && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}
    </div>
  );
};

export default SignUpComponent;
