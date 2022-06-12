import React from "react";
import classNames from "classnames";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/styles/queue.css';

//Component that displays individual interviewer data
export default function QueueListItem(props) {
  console.log("props", props)
  const { dateCreated, studentFirstName, studentLastName, environment, description, numInQueue }  = props;
  //return an item for each workorder passed in as a prop
  const options = { year: "numeric", month: "long", day: "numeric" }
  const formattedDate =  new Date(dateCreated).toLocaleDateString(undefined, options)
  const formattedTime = new Date(dateCreated).toLocaleTimeString('en-US')
  const formattedDateTime = formattedDate +  " - " + formattedTime;
  
 
   return (
      <div class="queue-workorder-box">
        <div class="queue-workorder-header">
          <div>Workorder #: { numInQueue }</div> 
          <div>Created { formattedDateTime }</div></div>
        <div class="queue-workorder-body">
          <p class="queue-workorder-text">Student Name: { studentFirstName + " " +  studentLastName }</p>
          <p class="queue-workorder-text">Environment: { environment }</p>
          <p class="queue-workorder-text">Description: { description }</p>
          <div class="queue-workorder-footer">
            <div><a href="#" class="btn-workorder-footer">See user History</a></div>
            <div><a href="#" class="btn-workorder-footer">View</a></div>
          </div>
        </div>
      </div>
    );
}