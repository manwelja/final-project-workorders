import React from "react";
import './App.css';
import Navigation from "components/Navigation";
import WorkorderList from "components/WorkorderList";
// will need to import helpers once we get to that point but can do them in this file to start with
// will need to import hooks once we get to that point

export default function App(props) {
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <Navigation />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        <WorkorderList />
      </section>

    </main >
  );
}
