import React from "react";

const PreviousFeedback = (props) => {
  const { feedback } = props;
  return (
    <section>
      <h2><strong>Feedback</strong></h2>
      <p>{feedback}</p>
    </section>
  );
};

export default PreviousFeedback;