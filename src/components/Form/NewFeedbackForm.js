import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

import axios from "axios";

const NewFeedbackForm = (props) => {

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  // set the state of star rating component when clicked
  const handleRating = (rating) => {
    setRating(rating);
  };

  // clear textarea and rating when cancel is clicked
  const resetForm = () => {
    setDescription("");
    setRating(0);
  };

  // save feedback and rating to db
  const saveData = () => {

    // this object is just for organizing the data to be sent to the database
    const newData = { description: description, rating: rating / 20 };

    axios.post(`/api/update/workorder/${props.role}feedback/${props.workorderID}`, newData)
      .then(() => {
        setDescription("");
      })
      .catch((err) => { console.error(err); });
  };

  return (
    <>
      <section>
        <div style={{ textAlign: "center" }}>
          <h2><strong>Leave Feedback</strong></h2>
        </div>
      </section>

      <section style={{ textAlign: "center" }}>
        <p>
          Please Provide Feedback For Your Interaction:
        </p>
        <Rating
          onClick={handleRating}
          count={5}
          ratingValue={rating}
          initialRating={rating}
          size={50}
          fillColorArray={[
            '#f17a45',
            '#f19745',
            '#f1a545',
            '#f1b345',
            '#f1d045'
          ]}
        />
      </section>

      <section>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <br />
          <textarea
            class="feedback-input-box"
            cols="75"
            name="student_notes"
            placeholder="Leave some feedback"
            value={description}
            onChange={event => { setDescription(event.target.value); }}
          />
          <br />
          <button class="btn-workorder-footer-viewhist" onClick={() => resetForm()}>Cancel</button>
          <button class="btn-workorder-footer-viewhist" onClick={() => saveData()}>Submit Feedback</button>
        </form>

      </section>
    </>
  );
};

export default NewFeedbackForm;