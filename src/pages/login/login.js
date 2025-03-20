import React, { useState } from "react";
import "./login.css";
import loginVig from "../../assets/videos/loginvideo.mp4";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For now, just redirecting as in the original code
    window.location.href = window.location.origin + "/dashboard1/index.html";
  };

  return (
    <header>
      <div className="relative h-screen flex items-center justify-start">
        <video autoPlay muted loop id="bg-video">
          <source src={loginVig} type="video/mp4" />
          Your browser does not support the video.
        </video>

        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="text-xl mb-4">Login</h2>

            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-btn">
              Login
            </button>

            <p>
              <a href="#" className="text-pink-300 no-underline">
                Forget password?
              </a>
            </p>
          </form>
        </div>
      </div>
    </header>
  );
};

export default LoginPage;
