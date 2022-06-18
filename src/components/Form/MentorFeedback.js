// mentor view --> giving feedback to student
// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import PreviousFeedback from "./PreviousFeedback";
import NewFeedbackForm from "./NewFeedbackForm";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

//environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;

//consider keeping code DRY by making a subcomponent called header 
//to conditionally render the title and appropriate name
//(mentor vs. student)

const MentorFeedbackForm = (props) => {
  const { workorder } = props;

  const [feedback, setStudenttudentFeedback] = useState("");

  const getFeedbackForStudent = () => {
    axios.get(`http://${BASE_URL}/api/workorders/${workorder.id}`)
      .then(res => {
        if (res.data[0].mentor_notes) {
          setStudenttudentFeedback(res.data[0].mentor_notes);
        }
      });
  };
  useEffect(() => {
    getFeedbackForStudent();
  }, []);

  return (
    <article style={{
      textAlign: "center",
      display: "flex",
      "flex-direction": "column"
    }}
    >

      <PreviousFeedback feedback={feedback} />
      <NewFeedbackForm />
      {feedback ? <PreviousFeedback feedback={feedback} /> : <NewFeedbackForm />}
    </article >

  );
};

export default MentorFeedbackForm;