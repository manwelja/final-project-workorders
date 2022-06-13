// Emma - my workorders --> Just need it to link to them
import React from "react";
import WorkorderListItem from "components/WorkorderListItem";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/styles/workorders-student.css';

//Component that invokes a QueueListItem child for each workorder in the data set
export default function WorkorderList(props) {
  const { workorders, users, modules } = props;

  const getModuleById = moduleId => {
    for (const module of modules) {
      if (module.id === moduleId) {
        return module;
      }
    }
  };

  const getMentorNameById = mentorId => {
    for (const user of users) {
      if (user.id === mentorId) {
        return `${user.first_name} ${user.last_name}`;
      }
    }
  };

  const getStudentNameById = studentId => {
    for (const user of users) {
      if (user.id === studentId) {
        return `${user.first_name} ${user.last_name}`;
      }
    }
  };

  const workorder = workorders.map((workorder) => {
    return (
      <WorkorderListItem class="workorder-container"
        workorder_id={workorder.id}
        mentor_name={getMentorNameById(workorder.user_mentor_id)}
        student_name={getStudentNameById(workorder.user_student_id)}
        ref_link={workorder.link_to_module}
        description={workorder.description}
        mentor_notes={workorder.mentor_notes}
        student_rating={workorder.student_rating}
        student_notes={workorder.student_notes}
        date_created={workorder.date_created}
        module={getModuleById(workorder.module_id)}
      />);
  });

  return (
    <ul>{workorder}</ul>
  );

};