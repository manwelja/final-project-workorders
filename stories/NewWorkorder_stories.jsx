import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import NewWorkorder from "components/Form/NewWorkorder";

storiesOf("NewWorkorder", module)
  .add("NewWorkorder", () => (<NewWorkorder/>))

