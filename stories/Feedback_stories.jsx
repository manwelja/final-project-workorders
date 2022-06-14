import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import StudentFeedbackForm from "../src/components/Form/StudentFeedbackForm";
import MentorFeedbackForm from "../src/components/Form/MentorFeedbackForm";

const workorder = [
  {
    id: 1,
    user_student_id: 1,
    user_mentor_id: 3,
    status_id: 1,
    category_id: 2,
    module_id: 3,
    environment: "M1",
    description: "I'm pulling my hair out - blue screen of death!",
    screenshot_url: null,
    link_to_module: null,
    escalate: false,
    mentor_notes: "This was really tough",
    student_notes: "Great Mentor",
    mentor_rating: 5,
    student_rating: 3,
    date_created: "2018-02-12T15:00:00.000Z",
    date_pickup: "2018-02-12T15:03:00.000Z",
    date_closed: "2018-02-12T16:00:00.000Z",
    student_first_name: "John",
    student_last_name: "Doe",
    mentor_first_name: "Anne",
    mentor_last_name: "Smith",
    category: "Discussion",
    week: 1,
    day: 1,
    topic: "Bootcamp Reference Guide"
  }
]

const users = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    cohort_id: 1,
    handle: "jdoe",
    avatar: "",
    role: "student ",
    password: "password",
    active: true,
    join_date: "2018-02-12T07:00:00.000Z"
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Doe",
    email: "janedoe@gmail.com",
    cohort_id: 1,
    handle: "jndoe",
    avatar: "",
    role: "student ",
    password: "password",
    active: true,
    join_date: "2021-04-06T06:00:00.000Z"
  },
  {
    id: 3,
    first_name: "Anne",
    last_name: "Smith",
    email: "smitty@yahoo.com",
    cohort_id: 1,
    handle: "asmith",
    avatar: "",
    role: "mentor ",
    password: "password",
    active: true,
    join_date: "2021-06-25T06:00:00.000Z"
  },
  {
    id: 4,
    first_name: "Patricia",
    last_name: "Anderson",
    email: "pattya@hotmail.com",
    cohort_id: 2,
    handle: "panderson",
    avatar: "",
    role: "mentor ",
    password: "password",
    active: true,
    join_date: "2021-10-28T06:00:00.000Z"
  },
  {
    id: 5,
    first_name: "Wade",
    last_name: "Johnson",
    email: "wade@icloud.com",
    cohort_id: 2,
    handle: "wjohnson",
    avatar: "",
    role: "mentor ",
    password: "password",
    active: true,
    join_date: "2022-01-01T07:00:00.000Z"
  }
]

const id = workorder[0].id;
const studentID = workorder[0].user_student_id;
const studentName= users[studentID].first_name + " " + users[studentID].last_name
const mentorID = workorder[0].user_mentor_id;
const mentorName = users[mentorID].first_name + " " + users[mentorID].last_name

storiesOf("Feedback", module)
  .add("StudentFeedbackForm", () => (
    <StudentFeedbackForm
      id={id}
      studentID={studentID}
      mentorID={mentorID}
      mentorName={mentorName}
    />
  ))
  .add("MentorFeedbackForm", () => (
    <MentorFeedbackForm
      id={id}
      studentID={studentID}
      mentorID={mentorID}
      studentName={studentName}
    />
  ))