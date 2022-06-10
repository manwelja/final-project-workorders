// Emma
// Parallel to what mentor sees when they click a ticket to open it up
// will need to import css or css for this page
import classNames from "classnames";

import React, { Fragment } from "react";







export default function WorkorderListItem(props) {
const { workorder_id } = props;

 return (
    <main>
      <section>
        <h2>{workorder_id}</h2>
        <section>
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">Emma</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
          />
        </section>
      </section>
    </main>
  );
}