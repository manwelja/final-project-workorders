import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Navigation from "components/Navigation";

storiesOf("Navigation", module)
  .add("Navigation", () => (<Navigation 
  />))

