import React, { useState } from "react";
import Button from "../Button";
import { Spinner } from "react-bootstrap";
import MentorFeedback from "./MentorFeedback";
import StudentFeedback from "./StudentFeedback";
import MeetingLinkCreateForm from "./MeetingLinkCreateForm";
import MeetingLinkViewForm from "./MeetingLinkViewForm";

import classNames from "classnames";

import './workorderForm.css';

export default function ViewWorkorder(props) {
  const { workorder, userRole, onHistory, onPickupTicket, onCloseTicket } = props;

  const [loading, setLoading] = useState(false);
  const [closeTicketButton, setCloseTicketButton] = useState("Close Ticket");


  // display screenshot in component only if it exists
  const imageClass = classNames("wo-form-view-screenshot",
    { " hidden": !workorder.screenshot_url }
  );

  const handleCloseTicket = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setCloseTicketButton("Closed!");
    }, 1000);

    setTimeout(() => {
      onCloseTicket(workorder.id);
    }, 2000);
  };

  return (
    <>
      <div>
        <form class="wo-form-view-main" autoComplete="off" onSubmit={event => event.preventDefault()}>
          <section class="wo-form-container-view-mentor">
            <div class="wo-form-header">
              <div class="wo-form-title-container">
                <h1>View Help Request</h1>
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Student Name:</label></div>
              <div class="wo-form-data">{workorder.student_first_name + " " + workorder.student_last_name}</div>
            </div>

            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Mentor Name:</label></div>
              <div class="wo-form-data">{(workorder.mentor_first_name || "N/A") + " " + (workorder.mentor_last_name || "")}</div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Status:</label></div>
              <div class="wo-form-data">
                {workorder.status_description}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Link to module:</label></div>
              <div class="wo-form-data">
                <a href={workorder.link_to_module} target="_blank" rel="noreferrer">{workorder.link_to_module}</a>
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Workorder Number: </label></div>
              <div class="wo-form-data">
                {workorder.id}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Issue Description:</label></div>
              <div class="wo-form-data">
                {workorder.description}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Computer Environment:</label></div>
              <div class="wo-form-data">
                {workorder.environment}
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Category:</label></div>
              <div class="wo-form-data">
                {workorder.category}
              </div>
            </div>

            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Module:</label></div>
              <div class="wo-form-data">
                {workorder.topic}
              </div>
            </div>
            <div className={imageClass}>
              <a href={workorder.screenshot_url} target="_blank" rel="noreferrer">
                <img class="view-wo-img" src={workorder.screenshot_url} alt="Error Screenshot" />
              </a>
            </div>

            <div class="wo-form-meetinglink-data">
              {userRole === "mentor" && workorder.status_id === 2 && <MeetingLinkCreateForm id={workorder.id} />}
              {userRole === "student" && workorder.status_id === 2 && <MeetingLinkViewForm id={workorder.id} meetingLink={props.meetingLink} />}
            </div>


            <div class="wo-form-footer">
              {userRole === "mentor" && <div><Button className="button--confirm" confirm onClick={(e) => { e.preventDefault(); onHistory(workorder.user_student_id); }}>See History</Button></div>}
              {workorder.status_id === 1 && userRole === "mentor" && <div><Button className="button--confirm" confirm onClick={() => { onPickupTicket(workorder.id); }}>Pick Up</Button></div>}
              {workorder.status_id === 2 && userRole === "mentor" &&
                <div>
                  {loading && <Spinner className="spinner" animation="border" />}
                  {!loading && <Button className="button--confirm" confirm onClick={() => { handleCloseTicket(); }}>{closeTicketButton}</Button>}
                </div>}
            </div>
          </section>
        </form>

      </div>

      <div class="wo-form-feedback-container">
        <div class="wo-form-feedback-data">
          {userRole === "student" && workorder.status_id === 3 && !workorder.student_notes && <StudentFeedback userRole={userRole} workorder={workorder} />}
          {userRole === "mentor" && workorder.status_id === 3 && !workorder.mentor_notes && <MentorFeedback userRole={userRole} workorder={workorder} />}
        </div>
      </div>
    </>
  );
};