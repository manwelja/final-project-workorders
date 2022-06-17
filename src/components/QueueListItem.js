import React from "react";
import { formatDistance } from "date-fns";
import classNames from "classnames";
import 'bootstrap/dist/css/bootstrap.min.css';
import './queue.css';

//Component that displays individual interviewer data
export default function QueueListItem(props) {
  const { date_created, student_first_name, student_last_name, environment, description, numInQueue, week, topic, screenshot_url, onView, workorder_id, student_id, onHistory, onPickupTicket } = props;
  //return an item for each workorder passed in as a prop
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date_created).toLocaleDateString(undefined, options);
  const formattedTime = new Date(date_created).toLocaleTimeString('en-US');
  const formattedDateTime = formattedDate + " - " + formattedTime;
  const imageClass = classNames("queue-workorder-screenshot",
    { " hidden": !screenshot_url }
  );

  const age = (date) => {
    const currentDate = new Date().toISOString(); //get new date as string in iso format

    //return the time difference as age
    //arguments have to be casted as date objects
    return formatDistance(new Date(date), new Date(currentDate));
  };

  return (
    <div class="queue-workorder-box">
      <div class="queue-workorder-header">
        <div id="workorder-title">Queue Order #: {numInQueue}</div>
        <div id="workorder-created">Created {age(date_created)} ago</div></div>
      <div class="queue-workorder-body">
        <div class="queue-workorder-body-left">
          <p class="queue-workorder-text"><span class="category-name">Student Name: </span> <span>{student_first_name + " " + student_last_name}</span></p>
          <p class="queue-workorder-text"><span class="category-name">Environment: </span>{environment}</p>
        </div>
        <div class="queue-workorder-body-right">
          <p class="queue-workorder-text"><span class="category-name"> Topic: </span>{topic}</p>
          <p class="queue-workorder-text"><span class="category-name">Week: </span>{week}</p>
        </div>
      </div>
      <div class="description-container">
        <p class="queue-workorder-text"><span class="category-name">Description: </span>{description}</p>
      </div>

      <div className={imageClass}>
        <a href={screenshot_url}>
          <img src={screenshot_url} alt="Error Screenshot" />
        </a>
      </div>
      <div class="queue-workorder-footer">
        <div><a class="btn-workorder-footer" onClick={() => onHistory(student_id)}>See user History</a></div>
        <div><a class="btn-workorder-footer" onClick={() => onView(workorder_id)}>View</a></div>
        <div><a class="btn-workorder-footer" onClick={() => onPickupTicket(workorder_id)}>Pick Up Ticket</a></div>
      </div>
    </div >
  );
}