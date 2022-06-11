import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Button';

const ActiveTicket = (props) => {
  return (
    <Badge>
      {props.total} Total Open Tickets
    </Badge>
  );
};

export default ActiveTicket;