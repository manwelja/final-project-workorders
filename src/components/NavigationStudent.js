import "./navigation.css";
import Button from "./Button";

// Component that renders Navigation bar with proper buttons displayed for student view

export default function NavigationStudent(props) {
  const { onView, onNew, onLogout, mode } = props;
  const logoUrl = "./images/SOAR_Logo.png";
  return (
    <div class="nav-container">
      <div class="nav-app-logo"><img class="nav-app-logo" src={logoUrl} alt="Logo" /></div>
      <div class="nav-container-buttons-email">
        <div class="nav-login-email">Logged in as: {props.email}</div>
        <div class="nav-container-buttons">
          <div class="nav-container-button">
            <div><Button className="button--top-nav" top-nav onClick={onView} list={mode}>My Workorders</Button></div>
          </div>
          <div class="nav-container-button">
            <div><Button className="button--top-nav" top-nav onClick={onNew} new={mode}>New Workorder</Button></div>
          </div>
          <div class="nav-container-button">
            <div><Button className="button--top-nav" top-nav onClick={onLogout}>Logout</Button></div>
          </div>
        </div>
      </div>
    </div>
  );
};