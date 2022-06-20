import React from "react";
import classNames from "classnames";
import "./Button.css";

export default function Button(props) {

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
      "highlight--queue": props.queue === "SHOW_QUEUE",
      "highlight--progress": props.progress === "SHOW_IN_PROG",
      "highlight--closed": props.closed === "SHOW_CLOSED",
      "highlight--wo": props.workorders === "SHOW_MY_WO"
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}>
         {props.children}
      </button>
   );
}


