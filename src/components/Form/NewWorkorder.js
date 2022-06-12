// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button"

export default function NewWorkorder(props){
 
  const [module, setModule] = useState([{}]);
  const [selectedModule, setSelectedModule] = React.useState({selectedModule: ""});
  const [category, setCategory] = useState([{}]);
  const [selectedCategory, setSelectedCategory] = React.useState({selectedCategory: ""});
  const PORT = process.env.API_PORT;
  const HOST = process.env.API_HOST;
  const BASE_URL = HOST + ":" + PORT;
  console.log(BASE_URL)

  //populate the schedule when the application loads
  useEffect(() => {        
    Promise.all([                       
      axios.get(`http://${BASE_URL}/api/modules`),
      axios.get(`http://${BASE_URL}/api/categories`),
      //axios.get("/api/interviewers")
    ]).then((all) => {    
        //const modules = all[0].data.map((entry, idx) => [{label: entry.id, value: entry.topic}].flatten)
        //console.log("modules",modules)
        const modules = all[0].data;
        const category = all[1].data;
        console.log(category)
        setModule(modules);     
        setCategory(category);        
      })
    },[])

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
    console.log(selectedModule)
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(selectedCategory)
  };

  const validate = () => {
    console.log('here')
     return axios.put(`http://localhost:8001/api/workorders`, {user_student_id: 1, status_id: 1, category_id: selectedCategory, module_id: selectedModule, environment: "M1", Description: "Test"})
       .then((res) => {
        console.log(res)
         return;
       })
     }

     useEffect(() => {        
    console.log("selectedModule", selectedModule)    
  }
  ,[selectedModule])

  return (
    <main>
      <article>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
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
              <p>Please specify the category</p>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                {category.map((option) => (
                <option value={option.id}>{option.description}</option>
                ))}
              </select> 
            </section>

            <section>
              <p>Please specify which module you're working on:</p>  
              <select value={selectedModule} onChange={handleModuleChange}>
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
              </form>
            </section>
          </section>
          <br />
        </form>
        <section>
          <button>Cancel</button>
          <Button confirm onClick={ () => { validate() }}>Save Me</Button>
        </section>
      </article>
    </main>
  );
};
