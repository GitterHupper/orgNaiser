import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, FloatingLabel } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import UpdateProfilePic from "./UpdateProfilePic";
import "../../index.css";

const UpdateProfile = () => {
  const { currentUser, updateProfileEmail, updateProfilePassword, reAuthenticate, updateProfileView } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const passwordConfirmRef = useRef();
  const REpasswordRef = useRef();

  const [modal, setModal] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoBin, setPhotoBin] = useState();

  const navigate = useNavigate();

  document.querySelector(".ResettingForMainProgram").style.maxWidth = "400px";
  document.querySelector(".ResettingForMainProgram").classList.add("align-items-center");

  const handleReAuth = async (e) => {
    e.preventDefault();

    setLoading(true);

    Promise.resolve(reAuthenticate(REpasswordRef.current.value))
      .then(() => {
        setError("");
        setModal(false);
      })
      .catch(() => setError("Failed to Re Authenticate"))
      .finally(() => {
        setLoading(false);
      });

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("Passwords do Not Match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    setSuccess("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateProfileEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateProfilePassword(passwordRef.current.value));
    }
    if (usernameRef.current.value) {
      promises.push(updateProfileView(photoBin, usernameRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/update-profile");
        setSuccess("Profile Updated Successfully");
      })
      .catch(() => setError("Failed to Update Account"))
      .finally(() => {
        setLoading(false);
      });

    try {
      const profileViewRef = doc(projectFirestore, `users/${currentUser.uid}/`);
      setDoc(profileViewRef, {
        username: currentUser.displayName,
        userPhoto: currentUser.photoURL,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (modal)
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Re Authenticate</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleReAuth}>
              <Form.Group id="email">
                <FloatingLabel controlId="floatingUpdateEmailInput" label="Email" className="mb-3">
                  <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group id="password">
                <FloatingLabel controlId="floatingUpdatePasswordInput" label="Password" className="mb-3">
                  <Form.Control type="password" ref={REpasswordRef} />
                </FloatingLabel>
              </Form.Group>
              <Button
                variant="secondary"
                disabled={loading}
                style={{ marginTop: "20px" }}
                className="w-100 secondary"
                type="submit"
              >
                Confirm
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
      </>
    );
  else
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
              </Form.Group>
              <Form.Group id="username">
                <Form.Label>username</Form.Label>
                <Form.Control type="text" ref={usernameRef} defaultValue={currentUser.displayName} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} placeholder="Leave Blank to keep the same" />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave Blank to keep the same" />
              </Form.Group>
              <UpdateProfilePic usernameRef={usernameRef} photoBin={photoBin} setPhotoBin={setPhotoBin} />
              <Button
                variant="secondary"
                disabled={loading}
                style={{ marginTop: "25px" }}
                className="w-100 secondary"
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
      </>
    );
};

export default UpdateProfile;
