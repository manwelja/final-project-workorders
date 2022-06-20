import React, { useState, useEffect } from "react";

import axios from "axios";

const MeetingLinkCreateForm = (props) => {

  const [meetingLink, setMeetingLink] = useState("");
  const [meetingLinkDisplay, setMeetingLinkDisplay] = useState("");

  //retrieve meeting link for a workorder if it exsists
  const getMeetingLink = () => {

    axios.get(`/api/meetingLinks/${props.id}`)
      .then((res) => {
        if (res.data.length) {
          setMeetingLink(res.data[0].meeting_link);
          setMeetingLinkDisplay(res.data[0].meeting_link);
        }
      })
      .catch((err) => { console.error(err); });
  };

  //save meeting link to db and display it in the form
  const saveMeetingLink = () => {

    // this object is just for organizing the data to be sent to the database
    const newData = { workorder_id: props.id, meeting_link: meetingLink };

    axios.post(`/api/meetingLinks`, newData)
      .then(() => {
        setMeetingLinkDisplay(meetingLink);
        return;
      })
      .catch((err) => { console.error(err); });
  };

  // delete existing meeting link in db
  const deleteMeetingLink = () => {

    //Status id should be set to 1 initially
    return axios.post(`/api/meetingLinks/${props.id}`,)
      .then((res) => {
        return;
      })
      .catch((err) => console.error(err));
  };

  // save new meeting link to db
  const saveData = () => {

    //if a meeting link exists, update it
    if (meetingLink) {
      deleteMeetingLink()
        .then(saveMeetingLink());
    } else {
      saveMeetingLink();
    }
  };

  useEffect(() => {
    getMeetingLink();
  }, []);

  return (
    <>
      <label
        class="wo-form-label">Please enter a meeting link for the assistance session:
        <a href={meetingLinkDisplay}>  {meetingLinkDisplay}</a>
      </label>
      <input
        class="wo-meeting-link-text"
        type="text"
        name="meetingLink"
        placeholder="https://meet.google.com/xxx-xxxx-xxx"
        value={meetingLink}
        onChange={event => { setMeetingLink(event.target.value); }}
      />
      <div class="wo-form-data">
        <button id="send-meeting-link" class="button--wo-inline" onClick={(event) => { event.preventDefault(); saveData(); }}>Send</button>
      </div>
    </>
  );
};

export default MeetingLinkCreateForm;