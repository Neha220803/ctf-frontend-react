import React, { useState } from "react";
import {
  Container,
  Table,
  Form,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import useApi from "../../../hooks/hooks";
import "./leaderboard.css";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { getLeaderboard, loading, error } = useApi();

  // Function to fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      console.log("Raw leaderboard data:", data);

      // Transform data to match expected format
      const formattedData = data.map((item, index) => ({
        rank: index + 1,
        player: item.teamid || "Unknown Team",
        score: item.points || 0,
        solvedChallenges: item.completedChallenges
          ? item.completedChallenges.length
          : 0,
      }));

      console.log("Formatted data:", formattedData);
      setLeaderboardData(formattedData);
      setFilteredData(formattedData);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  // Filter data when search term changes
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(leaderboardData);
    } else {
      const filtered = leaderboardData.filter((player) =>
        player.player.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="bg-dark">
      <Container className="bg-dark text-white py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
          <h1 className="text-danger mt-4">Leaderboard</h1>
          <div className="d-flex">
            <Button
              variant="danger"
              className="me-3"
              onClick={fetchLeaderboard}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Refresh Leaderboard"
              )}
            </Button>
            <InputGroup>
              <Form.Control
                placeholder="Search by team name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-dark text-white border-danger"
              />
              <Button variant="outline-danger" onClick={handleSearch}>
                Search
              </Button>
            </InputGroup>
          </div>
        </div>

        <div className="leaderboard-container">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
              <p className="mt-2">Loading leaderboard data...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              Error loading leaderboard: {error}
            </div>
          ) : leaderboardData.length === 0 ? (
            <div className="text-center py-5">
              <p>Click the "Refresh Leaderboard" button to load data</p>
            </div>
          ) : (
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr className="text-danger">
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Score</th>
                  <th>Solved Challenges</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((player) => (
                  <tr key={player.rank}>
                    <td>{player.rank}</td>
                    <td>{player.player}</td>
                    <td>{player.score}</td>
                    <td>{player.solvedChallenges}</td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No teams found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>

        <div className="mt-4 p-3 bg-danger bg-opacity-10 rounded">
          <h3 className="text-white">Rules</h3>
          <ul className="text-white">
            <li>Teams are ranked based on total score</li>
            <li>
              In case of a tie, the team who solved more challenges ranks higher
            </li>
            <li>
              If still tied, the team who completed challenges faster ranks
              higher
            </li>
            <li>Click "Refresh Leaderboard" to see the latest scores</li>
            <li>
              Top 3 teams will receive special rewards at the end of the CTF
              event
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default LeaderboardPage;
