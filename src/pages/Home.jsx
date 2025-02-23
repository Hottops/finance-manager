import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Button, Dropdown } from "react-bootstrap";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // replace with session check
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // Clear session or token
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="home-page" style={{ backgroundColor: "#2e1f47", minHeight: "100vh" }}>
      <Navbar expand="lg" style={{ backgroundColor: "#003366" }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "#ffffff", fontSize: "2rem" }}>
            Finance Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            {!isLoggedIn ? (
              <>
                <Button variant="outline-light" className="me-3">
                  <Link to="/login" style={{ color: "#ffffff" }}>Login</Link>
                </Button>
                <Button variant="outline-light">
                  <Link to="/signup" style={{ color: "#ffffff" }}>Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline-light" onClick={handleLogout} style={{ color: "red" }}>
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="home-content" style={{ color: "#ffffff", textAlign: "center", paddingTop: "50px" }}>
        <h1>Welcome to Finance Manager</h1>
        <p>Track your financial transactions with ease.</p>
        <div style={{ color: "yellow", textAlign: "center", paddingTop: "100px", fontSize: "1.5rem"}}>
          <p></p>
          <p>FOR LOGIN USE THE FOLLOWING CREDENTIALS:</p>
          <p>USER NAME = user@example.com</p>
          <p>PASSWORD = password</p>
        </div>

        {/* You can add animations here */}
      </div>
    </div>
  );
}

export default Home;