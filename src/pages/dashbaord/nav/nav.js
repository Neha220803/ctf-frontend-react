import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./nav.css";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SquidGameNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("User signed out");
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
