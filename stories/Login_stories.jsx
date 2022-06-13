import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Login from "components/Login";


storiesOf("Login", module)
  .add("Login", () => (<Login/>))