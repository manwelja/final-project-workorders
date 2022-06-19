// student view --> giving feedback to mentor
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

//environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;

const MeetingLinkViewForm = (props) => {
    
  return (
    <article>
      <section>
        <div class="wo-form-container">
          <div class="wo-form-label-data">Please use the following link to meet with your mentor:</div>
          <div class="wo-form-data"><a href={props.meetingLink}> {props.meetingLink} </a></div>
        </div>
      </section>
    </article >
  );
};

export default MeetingLinkViewForm;