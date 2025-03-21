import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import "./challenges.css";
import useApi from "../../../hooks/hooks"; // Adjust the path based on your project structure
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

  const { submitFlag, getTeamScore } = useApi(); // Use the API hook to get the functions

  // Fetch user's completed challenges when component mounts
  useEffect(() => {
    fetchCompletedChallenges();
  }, []);

  // Function to fetch completed challenges
  const fetchCompletedChallenges = async () => {
    try {
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
      const teamId = localStorage.getItem("teamId");

      if (!teamId || !modalData.challengeId || !modalData.answer) {
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
        teamId: teamId,
        challengeId: modalData.challengeId,
        flag: modalData.answer,
      });

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
        messageText: "Error submitting flag",
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
        {/* Easy Challenges Section */}
        <div style={sectionStyle} className="pt-5">
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
