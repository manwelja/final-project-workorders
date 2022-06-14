// mentor view --> giving feedback to student
// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
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
    const newData = { description: description, rating: rating };

    axios.patch(`http://${BASE_URL}/api/update/workorder/mentorfeedback/${props.id}`, newData)
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
          <h2><strong>Student Feedback</strong></h2>
        </div>

        <p>Student Name: {props.studentName}</p>
      </section>

      <section style={{ textAlign: "center" }}>
        <p>
          Please Provide Feedback For Your Interaction
          (this will be viewable by the student, so keep that in mind)
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

export default MentorFeedbackForm;