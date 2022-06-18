// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

//environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;

const MeetingLinkViewForm = (props) => {

  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    getMeetingLink();
  }, []);
    
  const getMeetingLink = () => {
    axios.get(`http://${BASE_URL}/api/meetingLinks/${props.id}`)
      .then((res) => {
        console.log(res)
        setMeetingLink(res.data[0].meeting_link);
      })
      .catch(error => {
        console.error(error);
      });

  }
console.log("props", props)
console.log("meeting link", meetingLink)
  return (
    <article>
      <section>
        <form class="wo-form-container" autoComplete="off" onSubmit={event => event.preventDefault()}>
          <div class="wo-form-label-data">Please use the following link to meet with your mentor:</div>
          <div class="wo-form-data"><a href={meetingLink}> {meetingLink} </a></div>
        </form>
      </section>
    </article >
  );
};

export default MeetingLinkViewForm;