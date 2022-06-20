// Emma
// Parallel to what mentor sees when they click a ticket to open it up
// will need to import css or css for this page
import classNames from "classnames";
import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './workorders.css';

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
    date_closed,
    module,
    topic,
    category,
    status,
    onView,
    mentor_first_name,
    mentor_last_name,
    screenshot_url,
    status_description,
    mentor_rating
  }
    = props;

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDateCreated = new Date(date_created).toLocaleDateString(undefined, options);
  const formattedTimeCreated = new Date(date_created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formattedDateClosed = new Date(date_closed).toLocaleDateString(undefined, options);
  const formattedTimeClosed = new Date(date_closed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formattedDateTimeCreated = `${formattedDateCreated} ${formattedTimeCreated}`;
  const formattedDateTimeClosed = `${formattedDateClosed} ${formattedTimeClosed}`;

  const imageClass = classNames("wo-form-screenshot",
    { " hidden": !screenshot_url }
  );

  const noImageClass = classNames("wo-form-screenshot",
    { " hidden": screenshot_url }
  );

  const statusClass = classNames("wo-workorder-status", {
    "wo--new": status_description === "New",
    "wo--progress": status_description === "In Progress"
  });


  return (
    <div class="workorder-item-container">

      <div class="workorder-item-header">
        <div id="workorder-title">Workorder #: {workorder_id}</div>
        <div class="workorder-item-header-right">
          <div class="wo-workorder-created">Created: {formattedDateTimeCreated}</div>
          {status === 3 && <div class="wo-workorder-created">Closed: {formattedDateTimeClosed}</div>}
          {status !== 3 && <div class={statusClass}>Status: {status_description}</div>}
        </div>
      </div>
      <div class="workorder-item-body">
        <div class="workorder-col-1">
          <div class="workorder-item-body-left">
            <p class="workorder-item-text"><span class="category-name">Mentor Name: </span> <span>{`${mentor_first_name} ${mentor_last_name}`}</span></p>
            {mentor_rating && <p class="workorder-item-text"><span class="category-name">Mentor Rating: </span>{mentor_rating} stars</p>}
            {!mentor_rating && <p class="workorder-item-text"><span class="category-name">Mentor Rating: </span>N/A</p>}
          </div>
          <div class="workorder-item-body-right">
            <p class="workorder-item-text"><span class="category-name"> Topic: </span>{topic}</p>
            <p class="workorder-item-text"><span class="category-name">Category: </span>{category}</p>
          </div>
        </div>
        <div class="workorder-col-2">
          <div class="workorder-item-description-container">
            <p class="workorder-item-text"><span class="category-name">Issue Description: </span>{description}</p>
          </div>
        </div>

        <div class="workorder-item-footer">
          <div class="button--wo-inline" onClick={() => onView(workorder_id)}>View</div>
        </div>
      </div>
    </div>
  );
}