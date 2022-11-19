import React, { useRef, useState } from "react";
import { Form, Button, Card, FormControl, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useNavigation } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to Login");
    }

    setLoading(false);
  }

  return (
    <div>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <FormControl type="email" ref={emailRef} required></FormControl>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="Password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="w-100 text-center mt-2">
          {" "}
          Need An Account? <Link to="/signup">Sign Up</Link>
        </div>
      </>
    </div>
  );
}
