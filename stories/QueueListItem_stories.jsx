import QueueList from "components/QueueList";
import QueueListItem from "components/QueueListItem";

import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const workorders = [
  {
  id: 1,
  user_student_id: 1,
  user_mentor_id: 3,
  status_id: 1,
  category_id: 2,
  module_id: 3,
  environment: "M1",
  description: "Discussion",
  screenshot: null,
  link_to_module: null,
  escalate: false,
  mentor_notes: "This was really tough",
  student_notes: "Great Mentor",
  mentor_rating: 5,
  student_rating: 3,
  date_created: "2018-02-12T13:00:00.000Z",
  date_pickup: "2018-02-12T13:03:00.000Z",
  date_closed: "2018-02-12T14:00:00.000Z",
  student_first_name: "John",
  student_last_name: "Doe",
  mentor_first_name: "Anne",
  mentor_last_name: "Smith",
  week: 1,
  day: 1,
  topic: "Bootcamp Reference Guide"
  },
  {
  id: 2,
  user_student_id: 1,
  user_mentor_id: 4,
  status_id: 1,
  category_id: 2,
  module_id: 3,
  environment: "M1",
  description: "Discussion",
  screenshot: null,
  link_to_module: null,
  escalate: false,
  mentor_notes: "Student needed to add app.use(express.json()) to their server file",
  student_notes: "Hard time following along",
  mentor_rating: 2,
  student_rating: 5,
  date_created: "2018-03-12T12:00:00.000Z",
  date_pickup: "2018-03-12T12:03:00.000Z",
  date_closed: "2018-03-12T13:00:00.000Z",
  student_first_name: "John",
  student_last_name: "Doe",
  mentor_first_name: "Patricia",
  mentor_last_name: "Anderson",
  week: 1,
  day: 1,
  topic: "Bootcamp Reference Guide"
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
  id: 4,
  user_student_id: 1,
  user_mentor_id: 4,
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

storiesOf("queueListItem", module)
  .add("Empty", () => <QueueListItem workorder="" />)
  .add("DisplayWorkorder", () => <QueueListItem workorder={ workorders[0] }/>)

  storiesOf("queueList", module)
  .add("Empty", () => <QueueList workorders={[]} />)
  .add("DisplayWorkorder", () => <QueueList workorders={ workorders }/>)
