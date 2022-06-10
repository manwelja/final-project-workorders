import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import WorkorderListItem from "components/WorkorderListItem";

const users = [
{
  id: 8,
  first_name: "John",
  last_name:"Doe",
  email:"johndoe@gmail.com",
  cohort_id: 7,
  handle: "jndoe" ,
  avatar: "",
  role: "student",
  password: "password",
  active: true,
  join_date: "2018-03-14T13:00:00.000Z"
},
{
  id: 4,
  first_name: "Mentor",
  last_name:"Doe",
  email:"mentorndoe@gmail.com",
  cohort_id: 2,
  handle: "mentordoe" ,
  avatar: "",
  role: "mentor",
  password: "password",
  active: true,
  join_date: "2015-03-14T13:00:00.000Z"
}];

const modules = [
{
  id: 1,
  week: 1,
  day: 1,
  topic:"Organizing Our Code",
  archive: false
},
{
id: 3,
week: 2,
day: 4,
topic:"Harder Topic",
archive: false
}
];

const workorder = 
   {id: 4,
    user_student_id: 8,
    user_mentor_id: 4,
    status_id: 1,
    category_id: 1,
    module_id: 3,
    environment: "M1",
    description: "Code review please",
    screenshot: null,
    link_to_module: null,
    escalate: false,
    mentor_notes: "Not bad coding style, but there were some arries that could be more 'DRY'. Recommended helper functions",
    student_notes: "Meh",
    mentor_rating: 5,
    student_rating: 3,
    date_created: "2018-03-14T12:00:00.000Z",
    date_pickup: "2018-03-14T12:03:00.000Z",
    date_closed: "2018-03-14T13:00:00.000Z"
    };

const getMentorNameById = mentorId => {
for (const user of users) {
  if (user.id === mentorId) {
    return `${user.first_name} ${user.last_name}`
    }
  }
};

const getStudentNameById = studentId => {
for (const user of users) {
  if (user.id === studentId) {
    return `${user.first_name} ${user.last_name}`
    }
  }
};

const getModuleById = moduleId => {
for (const module of modules) {
  if (module.id === moduleId) {
    return module
    }
  }
};


storiesOf("WorkorderListItem", module)
  .add("View", () => (
  <WorkorderListItem 
    workorder_id={workorder.id}
    mentor_name={getMentorNameById(workorder.user_mentor_id)}
    student_name={getStudentNameById(workorder.student_id)}
    ref_link={workorder.link_to_module}
    description={workorder.description}
    mentor_notes={workorder.mentor_notes}
    student_rating={workorder.student_rating}
    student_notes={workorder.student_notes}
    date_created={workorder.date_created}
    module={getModuleById(workorder.module_id)}
    />
  ));
