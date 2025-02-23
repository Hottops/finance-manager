import React, { useState } from "react";
import { Form, Button, Container, Alert, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login validation
    if (email === "user@example.com" && password === "password") {
      // Proceed with login
      setShowError(false);
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      setShowError(true);
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
        <div className="login-form" style={{ width: "400px", padding: "20px", backgroundColor: "#fff", borderRadius: "8px" }}>
          <h2 className="text-center">Login</h2>
          {showError && <Alert variant="danger">Invalid email or password</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Login</Button>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/signup">Don't have an account? Sign up</Link>
            
            
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;

/*<br />
<Link to="/forgot-password">Forgot Password?</Link>
*/