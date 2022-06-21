import { useState } from "react";

// Function responsible for managing the view mode a specific user sees
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transitionView = (tMode) => {
    setMode(tMode);
  };

  return { mode, transitionView };
}