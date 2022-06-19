// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button";
import MentorFeedback from "./MentorFeedback";
import StudentFeedback from "./StudentFeedback";
import MeetingLinkCreateForm from "./MeetingLinkCreateForm";
import MeetingLinkViewForm from "./MeetingLinkViewForm";
import useScript from '../../hooks/useScript';
import './workorderForm.css';
import Select from 'react-select';
import classNames from "classnames";


//Environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;


export default function ViewWorkorder(props) {
  const { workorder, userRole, onCancel, onHistory, onPickupTicket, onCloseTicket } = props;

  const imageClass = classNames("wo-form-screenshot",
    { " hidden": !workorder.screenshot_url }
  );

  return (
    <>

      <article>
        <form class="wo-form-view-main" autoComplete="off" onSubmit={event => event.preventDefault()}>
          <section class="wo-form-container-view-mentor">
            <div class="wo-form-header"><h1>View Help Request</h1></div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Student Name:</label></div>
              <div class="wo-form-data">{workorder.student_first_name + " " + workorder.student_last_name}</div>
            </div>

            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Mentor Name:</label></div>
              <div class="wo-form-data">{(workorder.mentor_first_name || "N/A") + " " + (workorder.mentor_last_name || "")}</div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Status</label></div>
              <div class="wo-form-data">
                {workorder.status_description}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Link to module</label></div>
              <div class="wo-form-data">
                {workorder.link_to_module}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Workoder Number: </label></div>
              <div class="wo-form-data">
                {workorder.id}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please describe your issue</label></div>
              <div class="wo-form-data">
                {workorder.description}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify your computer environment</label></div>
              <div class="wo-form-data">
                {workorder.environment}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify the category</label></div>
              <div class="wo-form-data">
                {workorder.category}
              </div>
            </div>

            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify which module you're working on:</label></div>
              <div class="wo-form-data">
                {workorder.topic}
              </div>
            </div>
            <div className={imageClass}>
              <a href={workorder.screenshot_url}>
                <img src={workorder.screenshot_url} alt="Error Screenshot" />
              </a>
            </div>

            <div class="wo-form-label-data">
              <div class="wo-form-data">
                {userRole === "mentor" && workorder.status_id === 2 && <MeetingLinkCreateForm id={workorder.id} />}
                {userRole === "student" && workorder.status_id === 2 && <MeetingLinkViewForm id={workorder.id} meetingLink={props.meetingLink} />}
              </div>
            </div>

            <div class="wo-form-footer">
              {userRole === "mentor" && <div><Button className="button--confirm" confirm onClick={(e) => { e.preventDefault(); onHistory(workorder.user_student_id); }}>See History</Button></div>}
              {workorder.status_id === 1 && userRole === "mentor" && <div><Button className="button--confirm" confirm onClick={() => { onPickupTicket(workorder.id); }}>Pick Up</Button></div>}
              {workorder.status_id === 2 && userRole === "mentor" && <div><Button className="button--confirm" confirm onClick={() => { onCloseTicket(workorder.id); }}>Close Ticket</Button></div>}
            </div>
          </section>
        </form>
      </article>

      <div class="wo-form-label-data">
        <div class="wo-form-data">
          {userRole === "student" && workorder.status_id === 3 && !workorder.mentor_notes && <StudentFeedback userRole={userRole} workorder={workorder} />}
          {userRole === "mentor" && workorder.status_id === 3 && !workorder.student_notes && <MentorFeedback userRole={userRole} workorder={workorder} />}
        </div>
      </div>
    </>
  );
};