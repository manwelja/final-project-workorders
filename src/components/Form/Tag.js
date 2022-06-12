import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

const Tag = (props) => {
  return (
    <>
      <Badge bg="danger">
        {props.name}
      </Badge>
    </>
  );
};

export default Tag;