import React from "react";
import classNames from "classnames";
import "./Button.css";

export default function Button(props) {

   // Set classnames for conditional styling of buttons
   // Lines 12-17 are used to highlight the top nav bar buttons when a user is navigated to a specific page
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
      "highlight--queue": props.queue === "SHOW_QUEUE",
      "highlight--progress": props.progress === "SHOW_IN_PROG",
      "highlight--closed": props.closed === "SHOW_CLOSED",
      "highlight--wo": props.workorders === "SHOW_MY_WO",
      "highlight--list": props.list === "SHOW_WO_LIST",
      "highlight--new": props.new === "SHOW_NEW_WO"
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}>
         {props.children}
      </button>
   );
}


