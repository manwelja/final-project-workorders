import "./navigation.css";
import Button from "./Button";

export default function NavigationStudent(props) {
  const { onView, onNew, onLogout } = props;
  return (
    <div class="nav-container">
      <div class="nav-app-title">SOAR</div>
      <div class="nav-container-button">
        <div><Button className="button--top-nav" top-nav onClick={onView}>My Workorders</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={onNew}>New Workorder</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={onLogout}>Logout</Button></div>
      </div>
    </div>
  );
};