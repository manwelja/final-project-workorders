import React from "react";
import NewFeedbackForm from "./NewFeedbackForm";

const StudentFeedback = (props) => {

  return (
    <article
      style={{
        textAlign: "center",
        display: "flex",
        "flex-direction": "column"
      }}
    >
      <NewFeedbackForm workorderID={props.workorder.id} role={"student"} />
    </article >
  );
};

export default StudentFeedback;