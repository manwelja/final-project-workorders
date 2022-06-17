// Emma - my workorders --> Just need it to link to them
import React from "react";
import WorkorderListItem from "./WorkorderListItem";
import 'bootstrap/dist/css/bootstrap.min.css';
import './workorders-student.css';

//Component that invokes a QueueListItem child for each workorder in the data set
export default function WorkorderList(props) {
  const { workorders, onView, onHistory } = props;

  const workorder = workorders.map((workorder) => {
    return (
      <WorkorderListItem class="workorder-container"
        workorder_id={workorder.id}
        student_name={workorder.user_student_id}
        mentor_first_name={workorder.mentor_first_name}
        mentor_last_name={workorder.mentor_last_name}
        ref_link={workorder.link_to_module}
        description={workorder.description}
        mentor_notes={workorder.mentor_notes}
        student_rating={workorder.student_rating}
        student_notes={workorder.student_notes}
        date_created={workorder.date_created}
        date_closed={workorder.date_closed}
        module={workorder.module_id}
        topic={workorder.topic}
        week={workorder.week}
        screenshot_url={workorder.screenshot_url}
        onView={onView}
      />);
  });

  return (
    <ul>{workorder}</ul>
  );

};