import React from "react";
import { Modal, Button, Form, InputGroup, Accordion } from "react-bootstrap";
import "./challengePopup.css";
import { ImArrowRight } from "react-icons/im";
const ChallengePopup = ({
  modalData,
  closeModal,
  handleAnswerChange,
  handleSubmit,
}) => {
  const handleViewChallenge = () => {
    if (modalData.link) {
      window.open(modalData.link, "_blank");
    }
  };
  return (
    <Modal
      show={modalData.isOpen}
      onHide={closeModal}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Challenge Caption</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-danger mb-4">
          🔺 Welcome player, You have one chance. Will you play or walk away?
        </h6>
        <h3 className="text-center">{modalData.name}</h3>
        <h2 className="text-center mb-3">Score: {modalData.points}</h2>
        <p className="mb-4">{modalData.description}</p>

        <Accordion className="mb-3 p-0 m-0">
          <Accordion.Item eventKey="0" className="">
            <Accordion.Header className="m-0 p-0">View HINTS</Accordion.Header>
            <Accordion.Body className="text-start py-2 m-0">
              {modalData.hint || "No hint available for this challenge."}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button
          variant="success"
          className="w-100 mb-3"
          onClick={handleViewChallenge}
          disabled={!modalData.link}
        >
          View Challenge <ImArrowRight />
        </Button>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="ENTER YOUR ANSWER HERE"
            value={modalData.answer}
            onChange={handleAnswerChange}
          />
          <Button
            variant="warning"
            disabled={!modalData.answer.trim()}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </InputGroup>

        {modalData.statusMessage && (
          <div
            className={`text-center mt-2 ${
              modalData.isSuccess ? "text-success" : "text-danger"
            }`}
          >
            {modalData.messageText ||
              (modalData.isSuccess
                ? "Successful submission"
                : "Incorrect submission")}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ChallengePopup;
