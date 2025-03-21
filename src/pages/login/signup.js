import React, { useState } from "react";
import useApi from "../../hooks/hooks"; // Import the custom hook

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const { loading, error, signup, login } = useApi(); // Get both signup and login functions

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signup(email, password);
      if (result.status === "success") {
        setMessage("User created successfully!");
        // Login the user after successful signup to get the teamId
        const loginResult = await login(email, password);
        if (loginResult.status === "success") {
          setTeamId(loginResult.teamid);
        }
        // Clear the form
        setEmail("");
        setPassword("");
      } else {
        setMessage(result.message || "Signup failed");
      }
    } catch (err) {
      setMessage(error || "An error occurred during signup");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className=" flex-column align-items-center">
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
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
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

      {/* Display team ID if available */}
      {teamId && (
        <div className="alert alert-info mt-2">
          Your Team ID: <strong>{teamId}</strong>
        </div>
      )}
    </div>
  );
};

export default SignUpComponent;
