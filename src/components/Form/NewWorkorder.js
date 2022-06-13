// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button"
import useScript from '../../hooks/useScript';

//Environment variables
const PORT = process.env.API_PORT;
const HOST = process.env.API_HOST;
const BASE_URL = HOST + ":" + PORT;
const API_CLOUD_ID = process.env.API_CLOUD_ID;
const API_CLOUD_PRESET = process.env.API_CLOUD_PRESET;
  

export default function NewWorkorder(props){
  useScript('https://upload-widget.cloudinary.com/global/all.js');

  const [state, setState] = useState({
    modules: [{}],
    selectedModule: "",
    categories: [{}],
    selectedCategory: "",
    selectedFileUpload: "",
  });
  const [description, setDescription] = useState("");
  const [link_to_module, setLinkToModule] = useState("");

  
  //populate the schedule when the application loads
  useEffect(() => {        
    Promise.all([                       
      axios.get(`http://${BASE_URL}/api/modules`),
      axios.get(`http://${BASE_URL}/api/categories`),
    ]).then((all) => {    
        setState(prev => ({...prev, modules: all[0].data, categories: all[1].data}));      
      })
    },[])

  const handleModuleChange = (event) => {
    setState(prev => ({...prev, selectedModule: event.target.value}));    
  };
  const handleCategoryChange = (event) => {
    setState(prev => ({...prev, selectedCategory: event.target.value}));    
  };

  const handleFileChange = (event) => {
    setState(prev => ({...prev, selectedFileUpload: event.target.files[0]}));        
  };

  function saveData() {
    state.selectedFileUpload ? uploadToCloudifyData() : postToDatabase()
  }

  function uploadToCloudifyData() {
    const url = `https://api.cloudinary.com/v1_1/${API_CLOUD_ID}/upload`;
    const fd = new FormData();
    fd.append("upload_preset", API_CLOUD_PRESET);
    fd.append("tags", "workorder_system_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", state.selectedFileUpload);
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };
    return axios.post(url, fd, config)
        .then((res) => {
            postToDatabase(res.data.secure_url);
    }).catch((err) => console.log(err));    
  }
 
  const postToDatabase = (filePath = "") => {
    console.log("description:", state.description);
    return axios.put(`http://localhost:8001/api/workorders`, {user_student_id: 1, status_id: 1, category_id: parseInt(state.selectedCategory), module_id: parseInt(state.selectedModule), environment: "M1", description: description, link_to_module: link_to_module, screenshot_url: filePath})
    .then((res) => {
      return;
    })
  }  
  
  return (
    <main>
      <article>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <section>
            <h1>New Help Request</h1>
              <section>
                <label>Link to module</label>
                <br />
                <input
                  name="module-link"
                  type="text"
                  placeholder="Enter URL here"
                  value={ link_to_module }
                  onChange={(event) => { 
                    setLinkToModule(event.target.value);
                  }}
                />
              </section>

              <section>
                <label>Please describe your issue</label>
                <input                  
                  name="description"
                  type="text"
                  placeholder="What's up?"
                  value={ description }
                  onChange={(event) => { 
                    setDescription(event.target.value);
                  }}        
                />  
              </section>           
            <section>
              <p>Please specify your computer environment</p>
              <button>M1</button>
              <button>Vagrant (Mac)</button>
              <button>Windows</button>
            </section>

            <section>
              <p>Please specify the category</p>
              <select value={state.selectedCategory} onChange={handleCategoryChange}>
                {state.categories.map((option) => (
                <option key={option.id} value={option.id}>{option.description}</option>
                ))}
              </select> 
            </section>

            <section>
              <p>Please specify which module you're working on:</p>  
              <select value={state.selectedModule} onChange={handleModuleChange}>
                {state.modules.map((option) => (
                <option key={option.id} value={option.id}>{option.topic}</option>
                ))}
              </select> 
              <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange}></input>
            </section>       
            <section>
            <button>Cancel</button>
            <Button confirm onClick={ () => { saveData() }}>Save Me</Button>
          </section>
        </section> 
        </form> 
      </article>
    </main>
  );
};