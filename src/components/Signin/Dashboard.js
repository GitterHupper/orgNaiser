import React from "react";
import { Card, Alert } from "react-bootstrap";
import "../../index.css";

const Dashboard = () => {
  return (
    <>
      <Card className="Dashboard">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <Alert variant="danger"></Alert>
          <strong>Email: </strong>
        </Card.Body>
      </Card>
    </>
  );
};

export default Dashboard;
