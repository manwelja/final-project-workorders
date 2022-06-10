import React from "react";
import classNames from "classnames";

//Component that displays individual interviewer data
export default function QueueListItem(props) {
  const workorder = props.workorder;
  //return an item for each workorder passed in as a prop
    return (
      <div class="card">
        <img class="card-img-top" src="" alt="Student avatar and name" />
        <div class="card-body">
          <h5 class="card-title">Created { workorder.date_created }</h5>
          <p class="card-text">Student Name: { workorder.first_name } + " " + { workorder.last_name }</p>
          <p class="card-text">Environment: { workorder.environment }</p>
          <p class="card-text">Description: { workorder.description }</p>
          <a href="#" class="btn btn-primary">See user History</a>
          <a href="#" class="btn btn-primary">View</a>
        </div>
      </div>
    );
}