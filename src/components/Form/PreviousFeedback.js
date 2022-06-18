import React from "react";
import { Rating } from "react-simple-star-rating";

const PreviousFeedback = (props) => {
  const { userRole, feedback, rating } = props;

  return (
    <section>
      <h2><strong>Feedback</strong></h2>
      <p>{feedback}</p>
      <h3>{userRole === "mentor" ? "Student" : "Mentor"} Rating</h3>
      <Rating
        initialValue={rating}
        ratingValue={rating}
        readonly={rating > 0}
      />
    </section>
  );
};

export default PreviousFeedback;