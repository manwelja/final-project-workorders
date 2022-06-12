// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

export default function NewWorkorder(props){
 
  const [module, setModule] = useState([{}]);

  const [value, setValue] = React.useState({
    selectedModule: "",      
  });

  //populate the schedule when the application loads
  useEffect(() => {        
    Promise.all([      
      
      //console.log("port", process.env.API_PORT);
      axios.get("http://localhost:8001/api/modules"),
      //axios.get("/api/appointments"),
      //axios.get("/api/interviewers")
    ]).then((all) => {    
      //const modules = all[0].data.map((entry, idx) => [{label: entry.id, value: entry.topic}].flatten)
      //console.log("modules",modules)
      const modules = all[0].data;
      console.log("modules", modules)
      setModule(modules);     
      
      console.log("state modules", module)
      })
    },[])

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
            <p></p>
            <button>M1</button>
            <button>Vagrant (Mac)</button>
            <button>Windows</button>
          </section>

          <br />

          <section>
            <p>Please specify which module you're working on:</p>  
            <select value={value} onChange={handleChange}>
              {module.map((option) => (
              <option value={option.id}>{option.topic}</option>
              ))}
            </select> 
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
