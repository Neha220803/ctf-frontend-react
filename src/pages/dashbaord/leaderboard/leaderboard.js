import React, { useState, useEffect } from "react";
import { Container, Table, Form, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./leaderboard.css";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, player: "Team001", score: 9500, solvedChallenges: 15 },
    { rank: 2, player: "Team456", score: 8800, solvedChallenges: 14 },
    { rank: 3, player: "Team218", score: 8200, solvedChallenges: 12 },
    { rank: 4, player: "Team067", score: 7500, solvedChallenges: 11 },
    { rank: 5, player: "Team199", score: 7000, solvedChallenges: 10 },
    { rank: 6, player: "Team212", score: 6800, solvedChallenges: 10 },
    { rank: 7, player: "Team101", score: 6500, solvedChallenges: 9 },
    { rank: 8, player: "Team303", score: 6000, solvedChallenges: 9 },
    { rank: 9, player: "Team404", score: 5800, solvedChallenges: 8 },
    { rank: 10, player: "Team099", score: 5500, solvedChallenges: 8 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(leaderboardData);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(leaderboardData);
    } else {
      const filtered = leaderboardData.filter((player) =>
        player.player.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, leaderboardData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="bg-dark">
      <Container className="bg-dark text-white py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-danger">Leaderboard</h1>
          <InputGroup className="w-50">
            <Form.Control
              placeholder="Search by player name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-dark text-white border-danger"
            />
            <Button variant="outline-danger">Search</Button>
          </InputGroup>
        </div>

        <div className="leaderboard-container">
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
                    No players found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="mt-4 p-3 bg-danger rounded">
          <h3 className="text-white">Rules</h3>
          <ul className="text-white">
            <li>Players are ranked based on total score</li>
            <li>
              In case of a tie, the player who solved more challenges ranks
              higher
            </li>
            <li>
              If still tied, the player who completed challenges faster ranks
              higher
            </li>
            <li>Leaderboard updates in real-time</li>
            <li>
              Top 3 players will receive special rewards at the end of the CTF
              event
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default LeaderboardPage;
