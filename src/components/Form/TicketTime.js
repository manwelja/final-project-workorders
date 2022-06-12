import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

const TicketTime = (props) => {
  return (
    <Badge bg="warning">
      <h5>{props.time} Tickets Over 5 Minutes Old</h5>
    </Badge>
  );
};

export default TicketTime;