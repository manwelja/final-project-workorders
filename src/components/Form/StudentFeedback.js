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

const StudentFeedback = (props) => {
  const { workorder } = props;

  const [feedback, setMentorFeedback] = useState("");

  const getFeedbackForMentor = () => {
    axios.get(`http://${BASE_URL}/api/workorders/${workorder.id}`)
      .then(res => {
        if (res.data[0].student_notes) {
          setMentorFeedback(res.data[0].student_notes);
        }
      });
  };

  useEffect(() => {
    getFeedbackForMentor();
  }, []);

  return (
    <article
      style={{
        textAlign: "center",
        display: "flex",
        "flex-direction": "column"
      }}
    >

      {feedback ? <PreviousFeedback feedback={feedback} /> : <NewFeedbackForm />}
    </article >
  );
};

export default StudentFeedback;