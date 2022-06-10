import { configure } from "@storybook/react";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  //require("../stories/");
  //require("../stories/index2");
  //require("../stories/queue");
  requireAll(require.context("..", true, /_stories\.jsx?$/));
}

configure(loadStories, module);
