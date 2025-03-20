import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./challenges.css";

import ChallengePopup from "./challengePopup";

const ChallengesPage = () => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    name: "",
    points: 0,
    description: "",
    answer: "",
    statusMessage: false,
  });

  // Challenge data organized by difficulty level
  const challenges = {
    easy: [
      {
        name: "Cryptography",
        points: 100,
        description: "Decrypt a simple cipher text.",
        level: "Easy",
      },
      {
        name: "Steganography",
        points: 100,
        description: "Find the hidden message in an image.",
        level: "Easy",
      },
      {
        name: "Web Exploitation",
        points: 100,
        description: "Find an SQL Injection vulnerability.",
        level: "Easy",
      },
      {
        name: "Binary Exploitation",
        points: 100,
        description: "Analyze a basic buffer overflow vulnerability.",
        level: "Easy",
      },
      {
        name: "Reverse Engineering",
        points: 100,
        description: "Extract a hidden string from a compiled binary.",
        level: "Easy",
      },
      {
        name: "Forensics",
        points: 100,
        description: "Extract metadata from a file.",
        level: "Easy",
      },
      {
        name: "OSINT Challenge",
        points: 100,
        description: "Find a specific person using open-source intelligence.",
        level: "Easy",
      },
    ],
    medium: [
      {
        name: "Cryptography",
        points: 200,
        description: "Decrypt a message encoded with an advanced cipher.",
        level: "Medium",
      },
      {
        name: "Steganography",
        points: 200,
        description: "Extract hidden text from an audio file.",
        level: "Medium",
      },
      {
        name: "Web Exploitation",
        points: 200,
        description:
          "Find and exploit a Cross-Site Scripting (XSS) vulnerability.",
        level: "Medium",
      },
      {
        name: "Binary Exploitation",
        points: 200,
        description:
          "Analyze an executable to find and exploit a buffer overflow.",
        level: "Medium",
      },
      {
        name: "Reverse Engineering",
        points: 200,
        description:
          "Reverse engineer an application to bypass authentication.",
        level: "Medium",
      },
      {
        name: "Forensics",
        points: 200,
        description: "Recover deleted files from an image dump.",
        level: "Medium",
      },
      {
        name: "OSINT Challenge",
        points: 200,
        description:
          "Trace an online identity through multiple social platforms.",
        level: "Medium",
      },
    ],
    hard: [
      {
        name: "Hard 1",
        points: 500,
        description:
          "A complex King of the Hill Challenge involving multiple vulnerabilities.",
        level: "Hard",
      },
    ],
  };

  // Handle card click to open modal
  const handleCardClick = (challenge) => {
    if (challenge.level === "Hard") {
      window.location.href = "hard_challenge.html";
      return;
    }

    setModalData({
      ...modalData,
      isOpen: true,
      name: challenge.name,
      points: challenge.points,
      description: challenge.description,
    });
  };

  // Handle input change for answer field
  const handleAnswerChange = (e) => {
    setModalData({
      ...modalData,
      answer: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    setModalData({
      ...modalData,
      statusMessage: true,
    });

    setTimeout(() => {
      setModalData({
        ...modalData,
        statusMessage: false,
      });
    }, 2000);
  };

  // Close modal
  const closeModal = () => {
    setModalData({
      ...modalData,
      isOpen: false,
    });
  };

  const sectionStyle = {
    marginBottom: "30px",
  };

  return (
    <section className="bg-dark text-white">
      <Container className="bg-dark text-white py-4" style={{}}>
        {/* Easy Challenges Section */}
        <div style={sectionStyle}>
          <h2 className="mb-4 text-danger">Easy</h2>
          <Row>
            {challenges.easy.map((challenge, index) => (
              <Col
                key={`easy-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className=" cards-wrapper"
              >
                <Card
                  className="h-100 border-danger challenge-card"
                  onClick={() => handleCardClick(challenge)}
                >
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Card.Title>{challenge.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Medium Challenges Section */}
        <div style={sectionStyle}>
          <h2 className="mb-4 text-warning">Medium</h2>
          <Row>
            {challenges.medium.map((challenge, index) => (
              <Col
                key={`medium-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="cards-wrapper"
              >
                <Card
                  className="h-100 border-warning challenge-card"
                  onClick={() => handleCardClick(challenge)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(255, 193, 7, 0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Card.Title>{challenge.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Hard Challenges Section */}
        <div style={sectionStyle}>
          <h2 className="mb-4 text-success">Hard</h2>
          <Row>
            {challenges.hard.map((challenge, index) => (
              <Col
                key={`hard-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-3 cards-wrapper"
              >
                <Card
                  as="a"
                  href="hard_challenge.html"
                  className="h-100 border-success challenge-card"
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(40, 167, 69, 0.5)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Card.Title>{challenge.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Challenge Modal */}
        <ChallengePopup
          modalData={modalData}
          handleAnswerChange={handleAnswerChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      </Container>
    </section>
  );
};

export default ChallengesPage;
