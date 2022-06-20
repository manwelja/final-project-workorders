// student view --> giving feedback to mentor
import React from "react";
// import PreviousFeedback from "./PreviousFeedback";
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

// {workorder.student_notes ?
//   <PreviousFeedback userRole={userRole} feedback={workorder.student_notes} rating={workorder.mentor_rating * 20} /> :
//   <NewFeedbackForm workorderID={workorder.id} role={"student"}/>}