import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import WorkorderListItem from "components/WorkorderListItem";
import WorkorderList from "../src/components/WorkorderList";

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

const workorders = [
{ id: 4,
  user_student_id: 8,
  user_mentor_id: 4,
  status_id: 1,
  category_id: 1,
  module_id: 3,
  environment: "M1",
  description: "Code review please",
  screenshot: null,
  link_to_module: "www.google.com",
  escalate: false,
  mentor_notes: "Not bad coding style, but there were some arries that could be more 'DRY'. Recommended helper functions",
  student_notes: "Meh",
  mentor_rating: 5,
  student_rating: 3,
  date_created: "2018-03-14T12:00:00.000Z",
  date_pickup: "2018-03-14T12:03:00.000Z",
  date_closed: "2018-03-14T13:00:00.000Z"
},
{
  id: 3,
  user_student_id: 2,
  user_mentor_id: 4,
  status_id: 1,
  category_id: 2,
  module_id: 3,
  environment: "WSL",
  description: "Discussion",
  screenshot: null,
  link_to_module: null,
  escalate: false,
  mentor_notes: "M1 issue - needed to change package.json as per Francis' recommendation ",
  student_notes: "Mentor fixed problem super quick",
  mentor_rating: 1,
  student_rating: 1,
  date_created: "2018-03-13T12:00:00.000Z",
  date_pickup: "2018-03-13T12:03:00.000Z",
  date_closed: "2018-03-13T13:00:00.000Z",
  student_first_name: "Jane",
  student_last_name: "Doe",
  mentor_first_name: "Patricia",
  mentor_last_name: "Anderson",
  week: 1,
  day: 1,
  topic: "Bootcamp Reference Guide"
  },
  {
  id: 12,
  user_student_id: 1,
  user_mentor_id: 19,
  status_id: 1,
  category_id: 1,
  module_id: 3,
  environment: "M1",
  description: "Code review",
  screenshot: null,
  link_to_module: null,
  escalate: false,
  mentor_notes: "Not bad coding style, but there were some arries that could be more 'DRY'. Recommended helper functions",
  student_notes: "Meh",
  mentor_rating: 5,
  student_rating: 3,
  date_created: "2018-03-14T12:00:00.000Z",
  date_pickup: "2018-03-14T12:03:00.000Z",
  date_closed: "2018-03-14T13:00:00.000Z",
  student_first_name: "John",
  student_last_name: "Doe",
  mentor_first_name: "Patricia",
  mentor_last_name: "Anderson",
  week: 1,
  day: 1,
  topic: "Bootcamp Reference Guide"
  }
];
  

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

storiesOf("WorkorderList", module)
  .add("ViewWorkorders", () => (
  <WorkorderList 
    workorders={workorders}
    users = {users}
    modules = {modules}
    />
  ));


storiesOf("WorkorderListItem", module)
  .add("ViewWorkorder", () => (
  <WorkorderListItem 
    workorder_id={workorders[0].id}
    mentor_name={getMentorNameById(workorders[0].user_mentor_id)}
    student_name={getStudentNameById(workorders[0].student_id)}
    ref_link={workorders[0].link_to_module}
    description={workorders[0].description}
    mentor_notes={workorders[0].mentor_notes}
    student_rating={workorders[0].student_rating}
    student_notes={workorders[0].student_notes}
    date_closed={workorders[0].date_closed}
    module={getModuleById(workorders[0].module_id)}
    />
  ));



