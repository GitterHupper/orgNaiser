import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const { signup, updateProfileView } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRefSignin = useRef();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("Passwords do Not Match");
    }

    const promises = [];
    const tempUsername = usernameRefSignin.current.value;
    setLoading(true);
    setError("");

    if (emailRef.current.value && passwordRef.current.value) {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    }
    if (tempUsername) {
      promises.push(updateProfileView("signin", tempUsername));
    }

    Promise.all(promises)
      .then(() => {})
      .catch((err) => {
        if (err.message === "EMAIL_EXISTS") setError("Email Already Exists");
        else setError("Failed to Create an Account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="username">
              <Form.Label>username</Form.Label>
              <Form.Control type="text" ref={usernameRefSignin} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              variant="secondary"
              disabled={loading}
              style={{ marginTop: "20px" }}
              className="w-100"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signin;
