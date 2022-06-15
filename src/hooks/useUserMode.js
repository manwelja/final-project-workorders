import { useState } from "react";

//function responsible for managing the browser history
export default function useUserMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [user, setUser] = useState(initial);

  const transitionUser = (uMode) => {
    console.log("transitioning user");
    setUser(uMode);
  };

  return { user, transitionUser };

}