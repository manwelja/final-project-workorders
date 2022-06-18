// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

//environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;

const MeetingLinkCreateForm = (props) => {

  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    getMeetingLink();
  }, []);
    
  const getMeetingLink = () => {
    axios.get(`http://${BASE_URL}/api/meetingLinks/${props.id}`)
      .then((res) => {
        setMeetingLink(res.data[0].meeting_link);
      })
      .catch(error => {
        console.error(error);
      });

  }

  const saveData = () => {
    // this object is just for organizing the data to be sent to the database
    const newData = { workorder_id: props.id, meeting_link: meetingLink};
    axios.post(`http://${BASE_URL}/api/meetingLinks`, newData)
      .then(() => {
        setMeetingLink("");
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  return (
    <article>
      <section>
        <form class="wo-form-container" autoComplete="off" onSubmit={event => event.preventDefault()}>
          <label class="wo-form-label-data">Please enter a meeting link for the assistance session:</label>
          <input
            class="wo-form-data"
            type="text"
            name="meetingLink"
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
            value={meetingLink}
            onChange={event => { setMeetingLink(event.target.value); }}
          />
              <button class="button--wo-inline" onClick={() => saveData() }>Submit</button>
        </form>

      </section>
    </article >
  );
};

export default MeetingLinkCreateForm;