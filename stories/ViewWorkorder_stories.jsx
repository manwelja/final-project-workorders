import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import MeetingLinkCreateForm from "components/Form/MeetingLinkCreateForm";

storiesOf("MeetingLinkCreateForm", module)
  .add("MeetingLink", () => (<MeetingLinkCreateForm 
    workorderId={1}    
    meeting_link={"http://www.google.com"}
  />))

