import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Navigation from "components/NavigationMentor";

storiesOf("NavigationMentor", module)
  .add("Navigation", () => (<NavigationMentor 
  />))

