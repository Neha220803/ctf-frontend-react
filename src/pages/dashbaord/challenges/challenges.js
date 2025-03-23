import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "./challenges.css";
import useApi from "../../../hooks/hooks"; // Updated import path
import ChallengePopup from "./challengePopup";
import challenges from "./challengesData";

const ChallengesPage = () => {
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    name: "",
    points: 0,
    description: "",
    answer: "",
    statusMessage: false,
    isSuccess: false,
    messageText: "",
    challengeId: null,
  });

  // Use the API hook to get the functions and authentication state
  const { submitFlag, getTeamScore, isAuthenticated, teamId, loading, error } =
    useApi();

  // Fetch user's completed challenges when component mounts or auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated, fetching completed challenges");
      fetchCompletedChallenges();
    } else {
      console.log("Not authenticated yet");
    }
  }, [isAuthenticated]);

  // Function to fetch completed challenges
  const fetchCompletedChallenges = async () => {
    try {
      console.log("Fetching team score data...");
      const teamScore = await getTeamScore();
      console.log("Team score data:", teamScore);
      if (teamScore && teamScore.completedChallenges) {
        setCompletedChallenges(teamScore.completedChallenges);
      }
    } catch (error) {
      console.error("Error fetching completed challenges:", error);
    }
  };

  // Handle card click to open modal
  const handleCardClick = (challenge) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      alert("Please log in to access challenges");
      return;
    }

    // Check if challenge is already completed
    if (completedChallenges.includes(challenge.id)) {
      // Don't open modal, just show a message or do nothing
      return;
    }

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
      challengeId: challenge.id,
      answer: "",
      statusMessage: false,
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
  const handleSubmit = async () => {
    try {
      if (!isAuthenticated) {
        setModalData({
          ...modalData,
          statusMessage: true,
          isSuccess: false,
          messageText: "You need to be logged in to submit flags",
        });
        return;
      }

      console.log("Submitting flag with auth token...");

      if (!modalData.challengeId || !modalData.answer) {
        setModalData({
          ...modalData,
          statusMessage: true,
          isSuccess: false,
          messageText: "Missing required information",
        });
        return;
      }

      // Call the API to submit the flag
      const result = await submitFlag({
        challengeId: modalData.challengeId,
        flag: modalData.answer,
      });

      console.log("Flag submission result:", result);

      // Display success or error message based on response
      setModalData({
        ...modalData,
        statusMessage: true,
        isSuccess: result.status,
        messageText:
          result.message ||
          (result.status
            ? "Correct! You've earned " + modalData.points + " points!"
            : "Incorrect flag, please try again."),
      });

      // If flag was correct, update the completed challenges list
      if (result.status) {
        setCompletedChallenges([...completedChallenges, modalData.challengeId]);
      }
    } catch (error) {
      console.error("Error submitting flag:", error);

      setModalData({
        ...modalData,
        statusMessage: true,
        isSuccess: false,
        messageText:
          "Error submitting flag: " + (error.message || "Unknown error"),
      });
    }

    // Clear status message after a delay
    setTimeout(() => {
      if (modalData.isSuccess) {
        closeModal();
      } else {
        setModalData({
          ...modalData,
          statusMessage: false,
        });
      }
    }, 3000);
  };

  // Close modal
  const closeModal = () => {
    setModalData({
      ...modalData,
      isOpen: false,
      answer: "",
      statusMessage: false,
    });
  };

  // Function to check if a challenge is completed
  const isChallengeCompleted = (challengeId) => {
    return completedChallenges.includes(challengeId);
  };

  // Function to get challenge card styling
  const getChallengeCardStyle = (challenge) => {
    const isCompleted = isChallengeCompleted(challenge.id);

    let style = {
      cursor: isCompleted ? "default" : "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
    };

    if (isCompleted) {
      style.backgroundColor = "#28a745"; // Green background for completed challenges
      style.borderColor = "#28a745";
      style.color = "white";
    }

    return style;
  };

  const sectionStyle = {
    marginBottom: "30px",
  };

  return (
    <section className="bg-dark text-white">
      <Container className="bg-dark text-white py-4" style={{}}>
        {/* Authentication Status Section */}
        <div className="pt-5">
          {!isAuthenticated && (
            <div className="alert alert-warning my-4">
              Please log in to access and submit challenges.
            </div>
          )}

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger my-4">Error: {error}</div>
          )}

          {isAuthenticated && !loading && (
            <div className="alert alert-success my-4">
              User authenticated. Team ID: {teamId}
            </div>
          )}
        </div>

        {/* Easy Challenges Section */}
        <div style={sectionStyle}>
          <h2 className="mb-4 text-danger mt-5">Easy</h2>
          <Row>
            {challenges.easy.map((challenge, index) => (
              <Col
                key={`easy-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="cards-wrapper"
              >
                <Card
                  className="h-100 challenge-card"
                  style={getChallengeCardStyle(challenge)}
                  onClick={() => handleCardClick(challenge)}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>{challenge.name}</Card.Title>
                    {isChallengeCompleted(challenge.id) && (
                      <Badge bg="light" text="dark" className="mt-2">
                        Completed
                      </Badge>
                    )}
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
                  className="h-100 challenge-card"
                  style={getChallengeCardStyle(challenge)}
                  onClick={() => handleCardClick(challenge)}
                  onMouseOver={(e) => {
                    if (!isChallengeCompleted(challenge.id)) {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 0 10px rgba(255, 193, 7, 0.5)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isChallengeCompleted(challenge.id)) {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>{challenge.name}</Card.Title>
                    {isChallengeCompleted(challenge.id) && (
                      <Badge bg="light" text="dark" className="mt-2">
                        Completed
                      </Badge>
                    )}
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
                  className="h-100 challenge-card"
                  style={getChallengeCardStyle(challenge)}
                  onClick={() => handleCardClick(challenge)}
                  onMouseOver={(e) => {
                    if (!isChallengeCompleted(challenge.id)) {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 0 10px rgba(40, 167, 69, 0.5)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isChallengeCompleted(challenge.id)) {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>{challenge.name}</Card.Title>
                    {isChallengeCompleted(challenge.id) && (
                      <Badge bg="light" text="dark" className="mt-2">
                        Completed
                      </Badge>
                    )}
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
