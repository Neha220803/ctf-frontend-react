import React from "react";
import "./intro.css";

const IntroPage = () => {
  return (
    <section style={{ backgroundColor: "#111", color: "#fff" }}>
      <div className="container pt-5">
        <div className="hero">
          <h1 className="text-danger fw-bold">⚠ Welcome to Squid Game CTF</h1>
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
