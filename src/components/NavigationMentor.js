import "./navigation-mentor.css";
import Button from "./Button";

export default function NavigationStudent(props) {
  const { onShowNew, onShowInProgress, onShowClosed, onShowMy, getWorkordersByMentorID, onLogout } = props;
  return (
    <div class="nav-container">
      <div class="nav-app-title">SOAR</div>
      <div class="nav-container-button">
        <div><Button className="button--top-nav" top-nav onClick={onShowNew}>Workorders Queue</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={onShowInProgress}>In Progress Workorders</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={onShowClosed}>Closed Workorders</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={onShowMy}>My Workorders</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={onLogout}>Logout</Button></div>
      </div>
    </div>
  );
};