import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Button';

const ActiveTicket = () => {
  return (
    <Badge bg="success">
      <h2>Active Tickets</h2>
    </Badge>
  );
};

export default ActiveTicket;