// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentFeedbackForm = (props) => {

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
        <p>[put some stars here]</p>
      </section>

      <section>
        <form>
          <label>Please Provide Feedback For Your Interaction:</label>
          <br />
          <input
            type="text"
            name="student_notes"
            placeholder="Tell us how we did"
          />
          <br />
          <button>Submit Feedback</button>
        </form>

      </section>
    </article >
  );
};

export default StudentFeedbackForm;;