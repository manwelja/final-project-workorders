import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Button';

const TicketTime = (props) => {
  return (
    <Badge>
      {props.time} Tickets Over 5 Minutes Old
    </Badge>
  );
};

export default TicketTime;