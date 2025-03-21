import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./nav.css";
import { useNavigate, useLocation } from "react-router-dom";
import useApi from "../../../hooks/hooks"; // Adjust the path to match your project structure

const SquidGameNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useApi(); // Use the logout hook from your API hooks

  const handleSignOut = async () => {
    try {
      // Call the logout endpoint through your API hook
      const result = await logout();

      // Clear local storage
      localStorage.removeItem("teamId");
      localStorage.removeItem("token"); // If you store auth token

      // Redirect to login page
      navigate("/login");

      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);

      // Even if there's an error, still clear local storage and redirect
      localStorage.removeItem("teamId");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Navbar variant="dark" expand="md" className="shadow-lg">
      <div className="container">
        <Navbar.Brand href="#">SQUID GAME CTF</Navbar.Brand>
        <Navbar.Toggle onClick={() => setIsOpen(!isOpen)} />
        <Navbar.Collapse className={isOpen ? "show" : ""}>
          <Nav className="ms-auto">
            <Nav.Link onClick={() => handleNavigation("/dashboard/home")}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigation("/dashboard/challenges")}>
              Challenges
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavigation("/dashboard/leaderboard")}
            >
              Leaderboard
            </Nav.Link>
            <Button onClick={handleSignOut} className="btn btn-dark ml-md-2">
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default SquidGameNavbar;
