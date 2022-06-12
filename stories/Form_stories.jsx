import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Form from "../src/components/Form";
import { formatDistance } from "date-fns";

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
    screenshot: null,
    link_to_module: "www.thismodule.com",
    escalate: false,
    mentor_notes: "This was really tough",
    student_notes: "Great Mentor",
    mentor_rating: 5,
    student_rating: 3,
    date_created: "2018-02-12T15:00:00.000Z",
    date_pickup: "2018-02-12T15:03:00.000Z",
    date_closed: "2018-02-12T16:00:00.000Z"
  }
]

const user = [
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
  }
]

const module = [
  {
    id: 1,
    week: 0,
    day: 0,
    topic: "Other...",
    archive: false
  }
]

const data = [
  {
    id: workorder[0].id,
    first_name: user[0].first_name,
    last_name: user[0].last_name,
    topic: module[0].topic,
    link_to_module: workorder[0].link_to_module,
    description: workorder[0].description,
    tags: ["EJS", "CSS", "React", "Ruby", "SQL"],
    date: formatDistance(new Date(workorder[0].date_pickup), new Date(workorder[0].date_created))
  }
]

storiesOf("Form", module)
  .add("Form", () => (<Form data={data[0]}/>))