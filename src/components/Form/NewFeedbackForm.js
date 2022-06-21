import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Spinner } from "react-bootstrap";

import axios from "axios";

const NewFeedbackForm = (props) => {

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackButton, setFeedbackButton] = useState("Submit Feedback");

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

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setFeedbackButton("Submitted!");
    }, 1000);

    setTimeout(() => {
      saveData();
    }, 2000);

  };

  return (
    <>
      <section>
        <div class="new-feedback-header">
          <h2><strong>Leave Feedback</strong></h2>
        </div>
      </section>

      <section class="new-feedback-header">
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
          {loading && <Spinner className="spinner" animation="border" />}
          {!loading && <button class="btn-workorder-footer-viewhist" onClick={() => handleSubmit()}>{feedbackButton}</button>}
        </form>

      </section>
    </>
  );
};

export default NewFeedbackForm;