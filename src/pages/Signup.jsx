import React, { useState } from "react";
import { Form, Button, Container, Alert, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      setShowError(true);
      setShowSuccess(false);
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowError(true);
      setShowSuccess(false);
    } else {
      setShowSuccess(true);
      setShowError(false);
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#003366" }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "#ffffff", fontSize: "2rem" }}>
            Finance Manager
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#2e1f47" }}>
        <div className="signup-form" style={{ width: "400px", padding: "20px", backgroundColor: "#fff", borderRadius: "8px" }}>
          <h2 className="text-center">Sign Up</h2>
          {showSuccess && <Alert variant="success">Account created successfully! Redirecting to login...</Alert>}
          {showError && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Sign Up</Button>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Signup;