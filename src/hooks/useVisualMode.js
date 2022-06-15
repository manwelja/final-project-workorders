import { useState } from "react";

//function responsible for managing the browser history
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  
  const transition = (tMode)  => {
    console.log("transitioning")
    setMode(tMode);
  }  

  return { mode, transition};


}