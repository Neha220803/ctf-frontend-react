import React, { useState } from "react";
import useApi from "../../hooks/hooks"; // Updated path if needed
import { Row, Col } from "react-bootstrap";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhar1, setAadhar1] = useState("");
  const [aadhar2, setAadhar2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [message, setMessage] = useState(null);
  const { loading, error, signup, login } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear any previous messages

    try {
      const result = await signup(
        email,
        password,
        mobile1,
        mobile2,
        aadhar1,
        aadhar2
      );
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

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center w-50"
      >
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
          <Row>
            <Col>
              <label>Mobile No.1:</label>
              <input
                type="text"
                placeholder="Enter Player-1's Mobile No."
                required
                className="mb-4 bg-dark text-white"
                value={mobile1}
                onChange={(e) => setMobile1(e.target.value)}
              />
            </Col>
            <Col>
              <label>Aadhar No.1:</label>
              <input
                type="text"
                placeholder="Enter Player-1's Aadhar No."
                required
                className="mb-4 bg-dark text-white"
                value={aadhar1}
                onChange={(e) => setAadhar1(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Mobile No.2:</label>
              <input
                type="text"
                placeholder="Enter Player-2's Mobile No."
                required
                className="mb-4 bg-dark text-white"
                value={mobile2}
                onChange={(e) => setMobile2(e.target.value)}
              />
            </Col>
            <Col>
              <label>Aadhar No.2:</label>
              <input
                type="text"
                placeholder="Enter Player-2's Aadhar No."
                required
                className="mb-4 bg-dark text-white"
                value={aadhar2}
                onChange={(e) => setAadhar2(e.target.value)}
              />
            </Col>
          </Row>

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
