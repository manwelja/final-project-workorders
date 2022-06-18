// student view --> giving feedback to mentor
import React from "react";
import PreviousFeedback from "./PreviousFeedback";
import NewFeedbackForm from "./NewFeedbackForm";

const StudentFeedback = (props) => {
  const { userRole, workorder } = props;

  return (
    <article
      style={{
        textAlign: "center",
        display: "flex",
        "flex-direction": "column"
      }}
    >

      {workorder.student_notes ?
        <PreviousFeedback userRole={userRole} feedback={workorder.student_notes} rating={workorder.mentor_rating * 20} /> :
        <NewFeedbackForm />}
    </article >
  );
};

export default StudentFeedback;