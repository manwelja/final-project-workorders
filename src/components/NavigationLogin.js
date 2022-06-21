import "./navigation.css";

// Navigation component that does not display buttons when a user is on the login page

export default function NavigationLogin(props) {
  const logoUrl = "./images/SOAR_Logo.png";
  return (
    <div class="nav-container">
      <div class="nav-app-logo"><img class="nav-app-logo" src={logoUrl} alt="Logo" /></div>
    </div>
  );
};