// form when student is creating a new workorder
import React, { Fragment } from "react";

const NewWorkorder = (props) => {
  return (
    <main>
      <article>
        <section>
          <h1>New Help Request</h1>
          <form>
            <section>
              <label>Link to instructions</label>
              <br />
              <input
                name="link"
                type="text"
                placeholder="Enter URL here"
                style={{ width: "500px" }}
              />
            </section>

            <br />

            <section>
              <label>Please describe your issue</label>
              <br />
              <input
                name="description"
                type="text"
                placeholder="Tell us what's up"
                style={{ width: "500px", height: "200px" }}
              />
            </section>
          </form>
        </section>

        <section>
          <section>
            <p>Please specify your computer environment</p>

            <button>M1</button>
            <button>Vagrant (Mac)</button>
            <button>Windows</button>
          </section>

          <br />

          <section>
            <p>Please select all applicable tags</p>

            <button>Git</button>
            <button>Javascript</button>
            <button>React</button>
          </section>

          <br />
          <br />

          <section>
            <form>
              <label>Optional: Upload screenshot(s)</label>
              <br />
              <input
                name="screenshot"
                type="file"
                multiple
              />
              <br />
              <br />

              <button>Submit</button>
            </form>
          </section>
        </section>
        <br />

        <section>
          <button>Cancel</button>
          <button>Submit Request</button>
        </section>
      </article>
    </main>
  );
};

export default NewWorkorder;