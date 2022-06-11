// COMPONENT THAT PULLS WORKORDER INFORMATION AND DISPLAYS IT
// AARON
// workorder_from_queue -> what mentor sees when they open the link
import React from "react";
import NewWorkorder from "./Form/NewWorkorder";
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = (props) => {
  return (
    <article>
      <h1>Form Component</h1>
      {/* will need to pass in props here */}
      <NewWorkorder />
    </article>
  );
};

export default Form; 