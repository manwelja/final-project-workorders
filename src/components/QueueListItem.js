import React from "react";
import classNames from "classnames";

//Component that displays individual interviewer data
export default function QueueListItem(props) {
  console.log(props)
  const { dateCreated, studentFirstName, studentLastName, environment, description }  = props;
  //return an item for each workorder passed in as a prop
  const options = { year: "numeric", month: "long", day: "numeric" }
  const formattedDate =  new Date(dateCreated).toLocaleDateString(undefined, options)
  const formattedTime = new Date(dateCreated).toLocaleTimeString('en-US')
  const formattedDateTime = formattedDate +  " - " + formattedTime;
  
 
   return (
      <div class="card">
        <img class="card-img-top" src="" alt="Student avatar and name" />
        <div class="card-body">
          <h5 class="card-title">Created { formattedDateTime }</h5>
          <p class="card-text">Student Name: { studentFirstName + " " +  studentLastName }</p>
          <p class="card-text">Environment: { environment }</p>
          <p class="card-text">Description: { description }</p>
          <a href="#" class="btn btn-primary">See user History</a>
          <a href="#" class="btn btn-primary">View</a>
        </div>
      </div>
    );
}