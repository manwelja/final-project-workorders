// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

//environment variables
const PORT = process.env.API_PORT;
const HOST = process.env.API_HOST;
const BASE_URL = HOST + ":" + PORT;

const StudentFeedbackForm = (props) => {

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleRating = (rate) => {
    setRating(rate / 20);
    console.log(rating);
  };

  const resetForm = () => {
    setDescription("");
    setRating(0);
  };

  const saveData = () => {
    // this object is just for organizing the data to be sent to the database
    const newData = { fname: "student_notes", description: description, rating: rating };

    axios.patch(`http://${BASE_URL}/api/update/workorder/${props.id}`, newData)
      .then(() => {
        setDescription("");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <article>
      <section>
        <div style={{ textAlign: "center" }}>
          <h2><strong>Mentor Feedback</strong></h2>
        </div>

        <p>Mentor Name: {props.mentorName}</p>
      </section>

      <section style={{ textAlign: "center" }}>
        <p>
          How would you rate this interaction in terms of ability to resolve your issue,
          respectful communication, and overall attitude?
        </p>

        <Rating
          onClick={handleRating}
          initialValue={0}
          ratingValue={rating / 20}
          showTooltip
          tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Incredible!']}
        />
      </section>

      <section>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <label>Please Provide Feedback For Your Interaction:</label>
          <br />
          <input
            type="text"
            name="student_notes"
            placeholder="Tell us how we did"
            value={description}
            onChange={event => { setDescription(event.target.value); }}
          />
          <br />
          <button onClick={() => resetForm()}>Cancel</button>
          <button onClick={() => saveData()}>Submit Feedback</button>
        </form>

      </section>
    </article >
  );
};

export default StudentFeedbackForm;