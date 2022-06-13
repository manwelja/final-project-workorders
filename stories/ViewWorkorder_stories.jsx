import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ViewWorkorder from "components/Form/ViewWorkorder";

storiesOf("ViewWorkorder", module)
  .add("ViewWorkorder", () => (<ViewWorkorder 
    workorderId={"1"}    
  />))

