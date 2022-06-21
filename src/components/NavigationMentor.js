import React, { useState } from "react";
import "./navigation.css";
import Button from "./Button";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// Component that renders Navigation bar with proper buttons displayed for mentor view

export default function NavigationMentor(props) {
  const { onShowNew, onShowInProgress, onShowClosed, onShowMy, onLogout, mode } = props;
  const logoUrl = "./images/SOAR_Logo.png";

  const [menuValue, setMenuValue] = useState('Queue');

  const handleSelect = (e) => {
    setMenuValue(e);
  };

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
          border: transparent;
        }
        .queue-dropdown-menu-item {
          background: transparent;
          color: white;
          font-size: 1.1rem;
        }
        .header{
          color: white;
          border: transparent;
        }      
        .header:hover {
          color: #657860;  
        }
        .header:select {
           color: red;  
         }
        .queue-dropdown-menu:hover {
          background: transparent;
          color: #657860;
        }
        
        .queue-dropdown-menu:focus {
          background: white;
          color: #657860;
          outline: none;
          box-shadow: none;
        }

      `}
          </style>

          <div>
            <Dropdown as={ButtonGroup} onSelect={handleSelect} className="queue-dropdown-menu header">
              <span className="nav-dropdown"><Dropdown.Toggle className="queue-dropdown-menu header" variant="outline-light"> {menuValue}</Dropdown.Toggle></span>
              <Dropdown.Menu className="queue-dropdown-menu" >
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