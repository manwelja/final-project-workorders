import "./navigation.css";
import Button from "./Button";


export default function NavigationStudent(props) {
  const { onShowNew, onShowInProgress, onShowClosed, onShowMy, getWorkordersByMentorID, onLogout, mode } = props;
  const logoUrl = "./images/SOAR_Logo.png";

  return (
    <div class="nav-container">
      <div class="nav-app-logo"><img class="nav-app-logo" src={logoUrl} alt="Logo" /></div>
      <div class="nav-container-buttons">
        <div class="nav-login-email">Logged in as: {props.email}</div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onShowNew}>Workorders Queue</Button></div>
        </div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onShowInProgress}>In Progress Workorders</Button></div>
        </div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onShowClosed}>Closed Workorders</Button></div>
        </div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onShowMy}>My Workorders</Button></div>
        </div>
        <div class="nav-container-button">
          <div><Button className="button--top-nav" top-nav onClick={onLogout}>Logout</Button></div>
        </div>
      </div>
    </div>
  );
};