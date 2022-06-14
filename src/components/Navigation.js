import "./navigation.css"
import Button from "./Button"

export default function Navigation(props){
return(
  <div class="nav-container">    
      <div class="nav-app-title">SOAR</div>
      <div class="nav-container-button">
        <div><Button className="button--top-nav" top-nav onClick={ () => {  }}>My Workorders</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={ () => {  }}>New Workorder</Button></div>
        <div><Button className="button--top-nav" top-nav onClick={ () => {  }}>Logout</Button></div>
      </div>  
  </div>      
  );
};