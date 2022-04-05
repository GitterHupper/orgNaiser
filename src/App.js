import React, { Suspense } from "react";
import Login from "./components/Signin/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./Contexts/AuthContexts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const MainProgram = React.lazy(() => import("./components/MainProgram/MainProgram"));
  const UpdateProfile = React.lazy(() => import("./components/UpdateProfile/UpdateProfile"));
  const ForgotPassword = React.lazy(() => import("./components/ForgotPassword/ForgotPassword"));
  const Signin = React.lazy(() => import("./components/Signin/Signin"));

  return (
    <Container
      className="ResettingForMainProgram d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="ResettingForMainProgram w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Suspense fallback={<div></div>}>
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
            </Suspense>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
