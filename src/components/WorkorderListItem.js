// Emma
// Parallel to what mentor sees when they click a ticket to open it up
// will need to import css or css for this page
import classNames from "classnames";
import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './workorders-student.css';

export default function WorkorderListItem(props) {
  const {
    workorder_id,
    mentor_name,
    student_name,
    ref_link,
    description,
    mentor_notes,
    student_rating,
    student_notes,
    date_created,
    module,
    topic,
    week,
    status,
    onView }
    = props;

    const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date_created).toLocaleDateString(undefined, options);
  const formattedTime = new Date(date_created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return (
    <div class="workorder-item-container">

      <div class="workorder-item-header">
        <div id="workorder-title">Workorder #: {workorder_id}</div>
        <div class="workorder-item-header-right">
          <div id="workorder-created">Created {formattedDateTime}</div>
          <button type="button" class="btn btn-success"> Completed</button>
        </div>
      </div>
      <div class="workorder-item-body">
        <div class="workorder-item-body-left">
          <p class="workorder-item-text"><span class="category-name">Mentor Name: </span> <span>{mentor_name}</span></p>
          <p class="workorder-item-text"><span class="category-name">Mentor Rating: </span>3 Stars</p>
        </div>
        <div class="workorder-item-body-right">
          <p class="workorder-item-text"><span class="category-name"> Topic: </span>{topic}</p>
          <p class="workorder-item-text"><span class="category-name">Week: </span>{week}</p>
        </div>
      </div>
      <div class="workorder-item-description-container">
        <p class="workorder-item-text"><span class="category-name">Issue Description: </span>{description}</p>
      </div>
      <div class="workorder-item-footer">
        <div><a class="btn-workorder-footer" onClick={() => onView(workorder_id)}>View</a></div>
      </div>

    </div>
  );
}