// mentor view --> giving feedback to student
// student view --> giving feedback to mentor
import React from "react";
// import PreviousFeedback from "./PreviousFeedback";
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

// {workorder.mentor_notes ?
//   <PreviousFeedback userRole={userRole} feedback={workorder.mentor_notes} rating={workorder.student_rating * 20} /> :
//   <NewFeedbackForm workorderID={workorder.id} role={"mentor"}/>}