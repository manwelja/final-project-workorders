// Emma
// Parallel to what mentor sees when they click a ticket to open it up
// will need to import css or css for this page
import classNames from "classnames";

import React, { Fragment } from "react";



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
  module } 
  = props;

 return (
    <main>

      <section className="workorder-view-container">

        <section className="top-workorder-container">
          <h4>Workorder Id: {workorder_id}</h4>
          <h4 className="text--light">Mentor Name: {mentor_name}</h4>
          <h4 className="text--regular">Module Link: {ref_link}</h4>
          <h4 className="text--regular">Issue Descripton: {description}</h4>
          <h4 className="text--regular">Ticket Closed On: {date_closed}</h4>
        </section>



      <section>
        <section className="appointment__actions">
          <h4 className="text--regular">Module: {module.topic} (Week: {module.week} Day: {module.day}) </h4>
        </section>
      <section>
        <section className="feedback-area">
          <h4 className="text--regular"> Mentor Feedback Notes: {mentor_notes} </h4>
        </section>
      </section>
   </section>
      
      
      </section>
      

    </main>
  );
}
