// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentFeedbackForm = (props) => {
  const BASE_URL = 'http://localhost:8001';
  const [rating, setRating] = useState(0);
  const [workorder, setWorkorder] = useState([{}]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE_URL}/api/workorders/1`),
      axios.get(`${BASE_URL}/api/users`)
    ])
      .then((all) => {
        console.log('in get req.');
        console.log(all[0].data[0]);
        setWorkorder(all[0].data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const saveData = () => {
    console.log(`save data call:`);
    console.log(workorder);
    setWorkorder([{ ...workorder, "student_notes": notes }]);

    //use put using update in route .../api/update/workorders/1
    //sql: 
    // axios.patch(`${BASE_URL}/api/workorders/1`,);
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
        <p>[put some stars here]</p>
      </section>

      <section>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <label>Please Provide Feedback For Your Interaction:</label>
          <br />
          <input
            type="text"
            name="student_notes"
            placeholder="Tell us how we did"
            value={notes}
            onChange={event => { setNotes(event.target.value); }}
          />
          <br />
          <button onClick={() => saveData()}>Submit Feedback</button>
        </form>

      </section>
    </article >
  );
};

export default StudentFeedbackForm;;