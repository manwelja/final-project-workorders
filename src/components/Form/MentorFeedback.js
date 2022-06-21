import React from "react";

import NewFeedbackForm from "./NewFeedbackForm";

const MentorFeedback = (props) => {

  return (
    <article class="new-feedback">
      <NewFeedbackForm workorderID={props.workorder.id} role={"mentor"} />
    </article >
  );
};

export default MentorFeedback;
