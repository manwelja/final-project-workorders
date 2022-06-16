import { useState } from "react";

//function responsible for managing the browser history
export default function useUserMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [user, setUser] = useState(initial);

  const transitionUser = (uMode) => {
    setUser(uMode);
  };

  return { user, transitionUser };

}