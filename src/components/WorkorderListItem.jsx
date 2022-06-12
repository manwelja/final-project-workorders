// Emma
// Parallel to what mentor sees when they click a ticket to open it up
// will need to import css or css for this page
import classNames from "classnames";
import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.css';



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
  date_closed, 
  module,
  status } 
  = props;

const options = { year: "numeric", month: "long", day: "numeric" }
const formattedDate =  new Date(date_closed).toLocaleDateString(undefined, options)
const formattedTime = new Date(date_closed).toLocaleTimeString('en-US')
const formattedDateTime = formattedDate +  " - " + formattedTime;

 return (
    <main>

      <div className="workorder-view-container" class="card">

        <section className="top-workorder-container">
          <div class="list-group-item bg-primary mb-3">Workorder Number: {workorder_id} | Ticket Closed On: {formattedDateTime}</div>
        </section>

          <div className="meta-data"></div>
          <div class="card-body">Status: {status}</div>
          <div class="card-body">Module: {module.topic} (Week: {module.week} Day: {module.day}) </div>
          <div class="card-body">Mentor Name: {mentor_name}</div>
          <div class="card-body">Module Link: {ref_link}</div>
          <div class="card-body">Issue Descripton: {description}</div>
          
        
          <section className="feedback-section">
          <div class="card-body"> Mentor Feedback Notes: {mentor_notes} </div>
          <div class="card-body"> Your Rating: {student_rating} </div>
          <div class="card-body"> Your Feedback: {student_notes} </div>

        </section>
      
      </div>
      

    </main>
  );
}
