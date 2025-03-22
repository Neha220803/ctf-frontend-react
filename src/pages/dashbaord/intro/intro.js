import React, { useState, useEffect } from "react";
import "./intro.css";

const IntroPage = () => {
  const [teamScore, setTeamScore] = useState(null);
  const [sessionInfo, setSessionInfo] = useState({});

  useEffect(() => {
    // Fetch team score which includes session info
    const fetchTeamScore = async () => {
      try {
        const response = await fetch(
          "https://the-squid-hunt.vip/api/team-score",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setTeamScore(data);
        setSessionInfo({
          teamId: data.teamid,
          sessionId: document.cookie.includes("connect.sid")
            ? "Active"
            : "None",
        });
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamScore();
  }, []);

  return (
    <section style={{ backgroundColor: "#111", color: "#fff" }}>
      <div className="container pt-5">
        <div className="hero mt-5">
          <h1 className="text-danger fw-bold">⚠ Welcome to Squid Game CTF</h1>
          {sessionInfo.teamId && (
            <div className="debug-info bg-dark p-3 mt-3 rounded">
              <p className="text-info mb-1">Team ID: {sessionInfo.teamId}</p>
              <p className="text-info mb-1">
                Session Status: {sessionInfo.sessionId}
              </p>
              <p className="text-info mb-1">Points: {teamScore?.points || 0}</p>
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
              {/* <p className="fs-5">
                This isn't just a challenge; it's a **war of wits.** Solve cryptography, web security, 
                forensics, and reverse engineering puzzles to **prove your hacking mastery** and **climb the leaderboard**!
              </p> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="text-success">🛡 Why Join?</h2>
              {/* <p className="fs-5">
                - **Experience real-world cybersecurity scenarios**.<br>
                - **Compete with the best minds** in your college.<br>
                - **Earn recognition, bragging rights, and ultimate hacker glory**.
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container text-center mt-5">
        <h2 className="text-primary">🏆 Are You Ready?</h2>
        <p className="fs-5">
          Enter the arena, embrace the challenge, and let the **hacking battle
          begin!**
        </p>
        <a href="challenges.html" className="btn btn-danger btn-lg mt-3">
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
