import React from "react";
import WorkorderListItem from "./WorkorderListItem";
import 'bootstrap/dist/css/bootstrap.min.css';
import './workorders.css';

// Component that invokes a WorkorderListItem child for each workorder in the data set
export default function WorkorderList(props) {
  const { workorders, onView } = props;

  const workorder = workorders.map((workorder) => {
    // Returns a populated WorkorderListItem component for each workorder that exists in the data set
    return (
      <WorkorderListItem class="workorder-container"
        key={workorder.id}
        workorder_id={workorder.id}
        student_name={workorder.user_student_id}
        mentor_first_name={workorder.mentor_first_name || "N/A"}
        mentor_last_name={workorder.mentor_last_name || ""}
        ref_link={workorder.link_to_module}
        description={workorder.description}
        mentor_notes={workorder.mentor_notes}
        student_rating={workorder.student_rating}
        student_notes={workorder.student_notes}
        date_created={workorder.date_created}
        date_closed={workorder.date_closed}
        module={workorder.module_id}
        topic={workorder.topic}
        category={workorder.category}
        status_description={workorder.status_description}
        mentor_rating={workorder.mentor_rating}
        screenshot_url={workorder.screenshot_url}
        onView={onView}
      />);
  });

  return (
    <div class="workorder-container"> {workorder} </div>
  );

};