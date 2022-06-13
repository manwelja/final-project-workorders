import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import StudentFeedbackForm from "components/Form/StudentFeedbackForm";

storiesOf("Feedback", module)
  .add("StudentFeedbackForm", () => (<StudentFeedbackForm/>))