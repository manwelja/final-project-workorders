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
  const [meetingLinkDisplay, setMeetingLinkDisplay] = useState("");

  useEffect(() => {
    getMeetingLink();
  }, []);
    
  const getMeetingLink = () => {
    axios.get(`/api/meetingLinks/${props.id}`)
      .then((res) => {
        if(res.data.length) {
          setMeetingLink(res.data[0].meeting_link);
          setMeetingLinkDisplay(res.data[0].meeting_link)
        }        
      })
      .catch(error => {
        console.error(error);
      });

  }

  const saveData = () => {
    //if a meeting link exists, update it
    if(meetingLink) {
      deleteMeetingLink()
      .then( saveMeetingLink())
    } 
    saveMeetingLink();
  }
  const saveMeetingLink = () => {
    // this object is just for organizing the data to be sent to the database
    const newData = { workorder_id: props.id, meeting_link: meetingLink};
    axios.post(`/api/meetingLinks`, newData)
      .then(() => {
        console.log("display link", meetingLink)
        setMeetingLinkDisplay(meetingLink);
        //setMeetingLink("");
        return;
      })
      .catch(error => {
        console.error(error);
      })
    };   
 
  const deleteMeetingLink = () => {
    //Status id should be set to 1 initially - 
    return axios.post(`/api/meetingLinks/${props.id}`, )
    .then((res) => {
      return;
    }).catch((err) => console.log("error - should show screen")) 
  };

  return (
    <article>
      <section  class="wo-form-container">
          <label class="wo-form-label-data">Please enter a meeting link for the assistance session: <a href={meetingLinkDisplay}>  {meetingLinkDisplay}</a></label>
          <input
            class="wo-form-data"
            type="text"
            name="meetingLink"
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
            value={meetingLink}
            onChange={event => { setMeetingLink(event.target.value); }}
          />
              <button class="button--wo-inline" onClick={(event) => {event.preventDefault(); saveData() }}>Send</button>
      </section>
    </article >
  );
};

export default MeetingLinkCreateForm;