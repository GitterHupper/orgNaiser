import React from "react";
import Signin from "./components/Signin/Signin";
import Login from "./components/Signin/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import MainProgram from "./components/MainProgram/MainProgram";
import { AuthProvider } from "./Contexts/AuthContexts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container
      className="ResettingForMainProgram d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="ResettingForMainProgram w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <MainProgram />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<Signin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
