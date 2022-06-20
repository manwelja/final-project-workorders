import React from "react";

import NewFeedbackForm from "./NewFeedbackForm";

const MentorFeedback = (props) => {

  return (
    <article style={{
      textAlign: "center",
      display: "flex",
      "flex-direction": "column"
    }}
    >
      <NewFeedbackForm workorderID={props.workorder.id} role={"mentor"} />
    </article >
  );
};

export default MentorFeedback;