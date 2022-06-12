import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Form from "../src/components/Form";

storiesOf("Form", module)
  .add("Form", () => (<Form/>))