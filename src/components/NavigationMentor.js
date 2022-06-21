import React, { useState } from "react";
import "./navigation.css";
import Button from "./Button";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import classNames from "classnames";
// Component that renders Navigation bar with proper buttons displayed for mentor view

export default function NavigationMentor(props) {
  const { onShowNew, onShowInProgress, onShowClosed, onShowMy, onLogout, mode } = props;
  const logoUrl = "./images/SOAR_Logo.png";

  const [menuValue, setMenuValue] = useState('Queue');

  const handleSelect = (e) => {
    setMenuValue(e);
  };

  

  const dropdownHeaderClass = classNames("queue-dropdown-menu", {
    "--white-background": mode === "SHOW_QUEUE" || mode === "SHOW_IN_PROG" || mode === "SHOW_CLOSED",
  });
  const dropdownDivClass = classNames("nav-container-button-dropdown", {
    "--white-background": mode === "SHOW_QUEUE" || mode === "SHOW_IN_PROG" || mode === "SHOW_CLOSED",
  });
  
  return (
    <div class="nav-container">
      <div class="nav-app-logo"><img class="nav-app-logo" src={logoUrl} alt="Logo" /></div>
      <div class="nav-container-buttons-email">
        <div class="nav-login-email">Logged in as: {props.email}</div>
        <div class="nav-container-buttons">

          <style type="text/css">
            {`  
            .queue-dropdown-menu {
                background: transparent;
                color: white;
                font-size: 1.25rem;
                width: 10rem;
                height: 4rem;   
                border: none;       
              }
              .queue-dropdown-menu:hover {
                color: #657860;                   
              }
              .queue-dropdown-menu-item {
                background: transparent;
                color: #657860;
                font-size: 1.1rem;   
                border: transparent;       
              }
              .queue-dropdown-menu-item:hover {
                font-weight: bold;
                color: #657860;                    
              }
              .--white-background {
                background: white; 
                color: #657860;  
              }

            `}
          </style>

          <div class={dropdownDivClass}>
            <Dropdown as={ButtonGroup} onSelect={handleSelect}>
              <span><Dropdown.Toggle className={dropdownHeaderClass} variant="outline-light"> {menuValue}</Dropdown.Toggle></span>
              <Dropdown.Menu>
                <Dropdown.Item className="queue-dropdown-menu-item" onClick={onShowNew} eventKey="Queue">Queue</Dropdown.Item>
                <Dropdown.Item className="queue-dropdown-menu-item" onClick={onShowInProgress} eventKey="In Progress">In Progress</Dropdown.Item>
                <Dropdown.Item className="queue-dropdown-menu-item" onClick={onShowClosed} eventKey="Completed">Completed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div class="nav-container-button">
            <div><Button className="button--top-nav" top-nav onClick={onShowMy} workorders={mode}>My Workorders</Button></div>
          </div>
          <div class="nav-container-button">
            <div><Button className="button--top-nav" top-nav onClick={onLogout}>Logout</Button></div>
          </div>
        </div>
      </div>
    </div>
  );
};
