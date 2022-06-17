import "./navigation-mentor.css";
import Button from "./Button";

export default function NavigationStudent(props) {
  const { onShowNew, onShowInProgress, onShowClosed, onShowMy, getWorkordersByMentorID, onLogout } = props;
  return (
    <div class="nav-container">
      <div class="nav-app-title">SOAR</div>
    </div>
  );
};