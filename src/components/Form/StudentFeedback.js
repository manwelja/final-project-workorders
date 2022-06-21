import React from "react";
import NewFeedbackForm from "./NewFeedbackForm";

const StudentFeedback = (props) => {

  return (
    <article class="new-feedback">

      <NewFeedbackForm workorderID={props.workorder.id} role={"student"} />

    </article >
  );
};

export default StudentFeedback;