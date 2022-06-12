import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

const ModuleName = (props) => {
  return (
    <>
      <Badge bg="primary">
        {props.name}
      </Badge>
    </>
  );
};

export default ModuleName;