import React from "react";
import useApi from "../../../hooks/hooks"; // Adjust path as needed
import "./intro.css";

const IntroPage = () => {
  const { isAuthenticated, teamId } = useApi();

  return (
    <section style={{ backgroundColor: "#111", color: "#fff" }}>
      <div className="container pt-5">
        <div className="hero mt-5">
          <h1 className="text-danger fw-bold">⚠ Welcome to Squid Game CTF</h1>

          {isAuthenticated ? (
            <div className="debug-info bg-dark p-3 mt-3 rounded">
              <p className="text-success mb-1">User authenticated</p>
              <p className="text-info mb-1">Team ID: {teamId || "N/A"}</p>
            </div>
          ) : (
            <div className="debug-info bg-dark p-3 mt-3 rounded">
              <p className="text-warning mb-1">User not authenticated</p>
              <p className="text-info mb-1">
                Please log in to view your team stats
              </p>
            </div>
          )}

          <p className="fs-4">
            The ultimate cybersecurity battleground. Do you have what it takes
            to survive?
          </p>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-6 col-6">
            <div className="card p-4">
              <h2 className="text-warning">🔍 What's the Game?</h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="text-success">🛡 Why Join?</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container text-center mt-5">
        <h2 className="text-primary">🏆 Are You Ready?</h2>
        <p className="fs-5">
          Enter the arena, embrace the challenge, and let the{" "}
          <strong>hacking battle begin!</strong>
        </p>
        <a href="/dashboard/challenges" className="btn btn-danger btn-lg mt-3">
          🚀 Start Now
        </a>
      </div>

      {/* Footer */}
      <footer className="text-center p-3 mt-5">
        <p>&copy; 2024 Squid Game CTF | All rights reserved.</p>
      </footer>
    </section>
  );
};

export default IntroPage;
