import React from "react";
import classNames from "classnames"
import "../../public/styles/Button.css"

export default function Button(props) {
   
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   }); 

   return (
     <button 
       className={buttonClass} 
       onClick={props.onClick}>
          {props.children}
     </button>
   );
}

