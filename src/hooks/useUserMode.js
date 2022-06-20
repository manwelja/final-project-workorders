import { useState } from "react";

// Function responsible for managing the browser history
// It sets the user so that they are able to view applicable pages for their role
export default function useUserMode(initial) {

  const [user, setUser] = useState(initial);

  const transitionUser = (uMode) => {
    setUser(uMode);
  };

  return { user, transitionUser };

}