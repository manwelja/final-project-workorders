import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

const ActiveTicket = (props) => {
  return (
    <Badge bg="primary">
      <h5>{props.total} Total Open Tickets</h5>
    </Badge>
  );
};

export default ActiveTicket;