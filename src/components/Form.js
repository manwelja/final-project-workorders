// COMPONENT THAT PULLS WORKORDER INFORMATION AND DISPLAYS IT
// AARON
// workorder_from_queue -> what mentor sees when they open the link
import React from "react";

import ActiveTicket from "./Form/ActiveTicket";
import OpenTicket from "./Form/OpenTicket";
import TicketTime from "./Form/TicketTime";
import ModuleName from "./Form/ModuleName";
import Tag from "./Form/Tag";

import 'bootstrap/dist/css/bootstrap.min.css';

const Form = (props) => {
  const tags = ["EJS", "CSS", "React", "Ruby", "SQL"];

  const tagItems = tags.map(tag => {

    return (
      <Tag name={tag} />
    );
  });




  return (
    <div class="p-2 card">
      <section class="d-flex flex-row justify-content-between align-items-center">
        <section>
          <ActiveTicket />
        </section>
        <div class="d-flex flex-column">
          <OpenTicket total="15" />
          <TicketTime time="3" />
        </div>
      </section>

      <br />

      <section class="p-2 card">
        <section class="d-flex justify-content-between">
          <h3>Workorder #2</h3>
          <h3>Created 2 minutes ago</h3>
        </section>

        <hr />
        <div class="d-flex justify-content-between">
          <section>
            <h5>Student Name: Not Aaron</h5>
            <h5>Reference Link: <a href="...">www.thismodule.com</a></h5>

            <br />

            <h5>Issue Description:</h5>
            <div class="d-flex">
              <p class="p-2 border border-secondary">
                Tried some stuff, didn't work. Tried some more stuff, still didin't work.
                I think it's because of this.
              </p>
            </div>

            <br />

            <h5>Screenshot:</h5>
            <a href="/logo512.png">
              <img
                src="/logo192.png"
                alt="screenshot"
                style={{ width: "100px" }}
              />
            </a>
          </section>

          <section>
            <div class="d-sm-flex flex-column flex-wrap">
              <h4>Module Name: <ModuleName name="TinyApp" /></h4>
              <h4>Tags: {tagItems}</h4>
            </div>

            <div>

            </div>
          </section>
        </div>
      </section>

      <br />

      <section>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary">View Ticket</button>
          <button class="btn btn-success">Pick Up Ticket</button>
        </div>
      </section>
    </div>
  );
};

export default Form;;;