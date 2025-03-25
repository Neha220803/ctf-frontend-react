import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import useApi from "../../hooks/hooks"; // Update the path as needed
import "./officer.css";

const OfficerPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  const { loading, error, getOfficerUsers, isAuthenticated } = useApi();

  // Fetch users when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      const response = await getOfficerUsers();
      if (response.status === "success") {
        setUsers(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const viewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = (teamId) => {
    setTeamToDelete(teamId);
    setShowDeleteModal(true);
    setPassword("");
    setPasswordError("");
  };

  const confirmDelete = () => {
    // In a real application, you would make an API call to delete the team
    // For now, just close the modal
    setShowDeleteModal(false);

    // You would implement a deleteTeam API call here
    // For example: deleteTeam(teamToDelete)
  };

  // Helper function to get player information from a user
  const getUserPlayers = (user) => {
    return [
      {
        name: user.email, // Using email as name for demo
        mobile: user.mobile1,
        aadhar: user.aadhar1,
      },
      {
        name: `Player 2 of ${user.email}`, // Placeholder for second player
        mobile: user.mobile2,
        aadhar: user.aadhar2,
      },
    ];
  };

  if (!isAuthenticated) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          You must be logged in as an officer to view this page.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="squid-game-container">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h1 className="text-center squid-game-title">
            🔺 Squid Game Officer Portal 🔻
          </h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Table
            bordered
            responsive
            variant="dark"
            className="squid-game-table custom-dark-table"
          >
            <thead>
              <tr>
                <th>S. No</th>
                <th>Team Name</th>
                <th>Players</th>
                <th>View Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const players = getUserPlayers(user);
                return (
                  <React.Fragment key={user.teamid}>
                    <tr>
                      <td rowSpan="2">{index + 1}</td>
                      <td rowSpan="2">{user.email}</td>
                      <td>{players[0].name}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            viewProfile({ ...user, playerIndex: 0 })
                          }
                        >
                          View
                        </Button>
                      </td>
                      <td rowSpan="2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(user.teamid)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>{players[1].name}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            viewProfile({ ...user, playerIndex: 1 })
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Player Profile Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Player Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="profile-details">
              <p>
                <strong>Team ID:</strong> {selectedUser.teamid}
              </p>
              <p>
                <strong>Team Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Player:</strong>{" "}
                {selectedUser.playerIndex === 0 ? "1" : "2"}
              </p>
              <p>
                <strong>Mobile:</strong>{" "}
                {selectedUser.playerIndex === 0
                  ? selectedUser.mobile1
                  : selectedUser.mobile2}
              </p>
              <p>
                <strong>Aadhar:</strong>{" "}
                {selectedUser.playerIndex === 0
                  ? selectedUser.aadhar1
                  : selectedUser.aadhar2}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>To delete this team, please enter your officer password:</p>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {passwordError && <p className="text-danger mt-2">{passwordError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OfficerPage;
