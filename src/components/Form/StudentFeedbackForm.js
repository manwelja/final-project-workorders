// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

//environment variables
const PORT = process.env.API_PORT;
const HOST = process.env.API_HOST;
const BASE_URL = HOST + ":" + PORT;

const StudentFeedbackForm = (props) => {
  const [state, setState] = useState({}); //probably won't need this in the future
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");


  //lines 16-39 should be moved up a level and passed in as props to this component
  useEffect(() => {
    Promise.all([
      axios.get(`http://${BASE_URL}/api/workorders/1`),
      axios.get(`http://${BASE_URL}/api/users`)
    ])
      .then((all) => {
        setState(prev => ({ ...prev, ...all[0].data[0] }));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleRating = (rate) => {
    setRating(rate / 20);
    console.log(rating);
  };

  const resetDescription = () => {
    setDescription("");
  };

  const saveData = () => {
    const newState = { ...state, "student_notes": description };

    axios.patch(`http://${BASE_URL}/api/update/workorder/1`, { value: description, fieldname: "student_notes" })
      .then(() => {
        //confirming update here
        console.log("Feedback submitted");
        setState(newState);
        resetDescription();
      });
  };


  return (
    <article>
      <section>
        <div style={{ textAlign: "center" }}>
          <h2><strong>Mentor Feedback</strong></h2>
        </div>

        <p>Mentor Name: John Doe</p>
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
          <button onClick={() => saveData()}>Submit Feedback</button>
        </form>

      </section>
    </article >
  );
};

export default StudentFeedbackForm;