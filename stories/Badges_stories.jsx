import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ActiveTicket from "components/Form/ActiveTicket";
import OpenTicket from "components/Form/OpenTicket";
import TicketTime from "components/Form/TicketTime";

const workorders = [
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
    link_to_module: null,
    escalate: false,
    mentor_notes: "This was really tough",
    student_notes: "Great Mentor",
    mentor_rating: 5,
    student_rating: 3,
    date_created: "2018-02-12T15:00:00.000Z",
    date_pickup: "2018-02-12T15:03:00.000Z",
    date_closed: "2018-02-12T16:00:00.000Z"
  },
  {
    id: 2,
    user_student_id: 1,
    user_mentor_id: 4,
    status_id: 1,
    category_id: 2,
    module_id: 3,
    environment: "M1",
    description: "request.body is coming through as empty when I do an api put call",
    screenshot: null,
    link_to_module: null,
    escalate: false,
    mentor_notes: "Student needed to add app.use(express.json()) to their server file",
    student_notes: "Hard time following along",
    mentor_rating: 2,
    student_rating: 5,
    date_created: "2018-03-12T14:00:00.000Z",
    date_pickup: "2018-03-12T14:03:00.000Z",
    date_closed: "2018-03-12T15:00:00.000Z"
  },
  {
    id: 3,
    user_student_id: 2,
    user_mentor_id: 4,
    status_id: 1,
    category_id: 2,
    module_id: 3,
    environment: "WSL",
    description: "I'm getting errors when I try to install the LightBnB dependencies",
    screenshot: null,
    link_to_module: null,
    escalate: false,
    mentor_notes: "M1 issue - needed to change package.json as per Francis' recommendation ",
    student_notes: "Mentor fixed problem super quick",
    mentor_rating: 1,
    student_rating: 1,
    date_created: "2018-03-13T14:00:00.000Z",
    date_pickup: "2018-03-13T14:03:00.000Z",
    date_closed: "2018-03-13T15:00:00.000Z"
  },
  {
    id: 4,
    user_student_id: 1,
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
    date_created: "2018-03-14T14:00:00.000Z",
    date_pickup: "2018-03-14T14:03:00.000Z",
    date_closed: "2018-03-14T15:00:00.000Z"
  }
  ]

storiesOf("Badges", module)
  .add("ActiveTicket", () => (<ActiveTicket/>))
  .add("Open Ticket", () => (<OpenTicket total="15"/>))
  .add("Ticket Time", () => (<TicketTime time="3"/>))

