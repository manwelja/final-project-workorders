import React from "react";

const MeetingLinkViewForm = (props) => {

  return (
    <article>
      <section>
        <div class="wo-form-container-meetlink">
          <div class="wo-form-label-data">Please use the following link to meet with your mentor:</div>
          <div class="wo-form-data"><a href={props.meetingLink} target="_blank" rel="noreferrer"> {props.meetingLink} </a></div>
        </div>
      </section>
    </article >
  );
};

export default MeetingLinkViewForm;