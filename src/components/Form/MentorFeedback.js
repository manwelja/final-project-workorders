// mentor view --> giving feedback to student
// student view --> giving feedback to mentor
import React from "react";
import PreviousFeedback from "./PreviousFeedback";
import NewFeedbackForm from "./NewFeedbackForm";

const MentorFeedback = (props) => {
  const { userRole, workorder } = props;

  return (
    <article style={{
      textAlign: "center",
      display: "flex",
      "flex-direction": "column"
    }}
    >
      {workorder.mentor_notes ?
        <PreviousFeedback userRole={userRole} feedback={workorder.mentor_notes} rating={workorder.student_rating * 20} /> :
        <NewFeedbackForm />}
    </article >

  );
};

export default MentorFeedback;