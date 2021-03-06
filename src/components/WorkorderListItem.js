import classNames from "classnames";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './workorders.css';

// Individual workorder component that renders for the application's student view
export default function WorkorderListItem(props) {
  const {
    workorder_id,
    description,
    date_created,
    date_closed,
    topic,
    category,
    status,
    onView,
    mentor_first_name,
    mentor_last_name,
    status_description,
    mentor_rating
  }
    = props;

  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDateCreated = new Date(date_created).toLocaleDateString(undefined, options);
  const formattedTimeCreated = new Date(date_created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formattedDateClosed = new Date(date_closed).toLocaleDateString(undefined, options);
  const formattedTimeClosed = new Date(date_closed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formattedDateTimeCreated = `${formattedDateCreated} ${formattedTimeCreated}`;
  const formattedDateTimeClosed = `${formattedDateClosed} ${formattedTimeClosed}`;

  // Set classnames for conditional styling of status desctription and workorder item border colour based on order status
  const statusClass = classNames("wo-workorder-status", {
    "wo--new": status_description === "New",
    "wo--progress": status_description === "In Progress"
  });

  const headerClass = classNames("workorder-item-header", {
    "header--new": status_description === "New",
    "header--progress": status_description === "In Progress",
    "header--closed": status_description === "Closed"
  });


  return (
    <div class="workorder-item-container">

      <div class={headerClass}>
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