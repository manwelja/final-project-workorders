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

  const tagItems = props.data.tags.map(tag => {
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
        <div class="d-flex flex-column gap-2">
          <OpenTicket total="15" />
          <TicketTime time="3" />
        </div>
      </section>

      <br />

      <section class="p-2 card">
        <section class="d-flex justify-content-between">
          <h3>Workorder #{props.data.id}</h3>
          <h3>Created {props.data.date} ago</h3>
        </section>

        <hr />
        <div class="d-flex justify-content-between">
          <section>
            <h5>Student Name: {props.data.first_name} {props.data.last_name}</h5>
            <h5>Reference Link: <a href="...">{props.data.link_to_module}</a></h5>

            <br />

            <h5>Issue Description:</h5>
            <div class="d-flex">
              <p class="p-2 border border-secondary">
                {props.data.description}
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
            <div class="d-sm-flex flex-column">
              <h4>Module Name: <ModuleName name={props.data.topic} /></h4>
              <section>
                <h4 class="d-flex gap-2">Tags: {tagItems}</h4>
              </section>
            </div>

            <div>

            </div>
          </section>
        </div>
      </section>

      <br />

      <section>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-secondary">View Ticket</button>
          <button class="btn btn-success">Pick Up Ticket</button>
        </div>
      </section>
    </div>
  );
};

export default Form;;;