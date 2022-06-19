import "./navigation.css";
import Button from "./Button";

export default function NavigationStudent(props) {
  const { onView, onNew, onLogout } = props;
  const logoUrl = "./images/SOAR_Logo.png";
  return (
    <div class="nav-container">
      <div class="nav-app-logo"><img class="nav-app-logo" src={logoUrl} alt="Logo" /></div>
      <div class="nav-container-buttons">
        <div class="nav-login-email">Logged in as: {props.email}</div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onView}>My Workorders</Button></div>
        </div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onNew}>New Workorder</Button></div>
        </div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onLogout}>Logout</Button></div>
        </div>
      </div>
    </div>
  );
};