// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button"
import useScript from '../../hooks/useScript';
import '../../../public/styles/workorderForm.css';
import Select from 'react-select';

//Environment variables
const PORT = process.env.REACT_API_PORT;
const HOST = process.env.REACT_API_HOST;
const BASE_URL = HOST + ":" + PORT;
const API_CLOUD_ID = process.env.REACT_API_CLOUD_ID;
const API_CLOUD_PRESET = process.env.REACT_API_CLOUD_PRESET;
  

export default function NewWorkorder(props){
  const [state, setState] = useState({
    modules: [{}],
    selectedModule: "",
    categories: [{}],
    selectedCategory: "",
    selectedFileUpload: "",
  });
  const [description, setDescription] = useState("");
  const [link_to_module, setLinkToModule] = useState("");
  const [environment, setEnvironment] = useState("");

  
  //populate the workorder when the application loads
  useEffect(() => {        
    Promise.all([                       
      axios.get(`http://${BASE_URL}/api/modules`),
      axios.get(`http://${BASE_URL}/api/categories`),
    ]).then((all) => {    
        //format modules for select box
        const formattedModules = all[0].data.map((itm) => ({value:itm.id, label:itm.topic}))
        const formattedCategories = all[1].data.map((itm) => ({value:itm.id, label:itm.description}))
        setState(prev => ({...prev, modules: formattedModules, categories: formattedCategories}));      
      })
    },[])

  const handleModuleChange = (event) => {
    setState(prev => ({...prev, selectedModule: event.value}));    
  };
  const handleCategoryChange = (event) => {
    setState(prev => ({...prev, selectedCategory: event.value}));    
  };

  const handleFileChange = (event) => {
    setState(prev => ({...prev, selectedFileUpload: event.target.files[0]}));        
  };

  function saveData() {
    //need validation
    state.selectedFileUpload ? uploadToCloudifyData() : postToDatabase()
   // resetFormState()
  }

  function resetFormState() {
    setState(prev => ({...prev, selectedModule: "", selectedCategory: "", selectedFileUpload: ""}));
    setDescription("");
    setLinkToModule("");
    setEnvironment("");    
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
  //Status id should be set to 1 initially - 
  const postToDatabase = (filePath = "") => {
      return axios.put(`http://${BASE_URL}/api/workorders`, {user_student_id: props.student_id, category_id: parseInt(state.selectedCategory), module_id: parseInt(state.selectedModule), environment: environment, description: description, link_to_module: link_to_module, screenshot_url: filePath})
    .then((res) => {
      console.log(res);
      return;
    }).catch((err) => console.log("error - should show screen"))
    
  }    
  return (
    <main>
      <article>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <section class="wo-form-container">
            <div class="wo-form-header"><h1>New Help Request</h1></div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Student Name:</label></div>
              <div class="wo-form-data">{props.student_name}</div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Link to module</label></div>
              <div class="wo-form-data">
                <input
                  class="wo-form-text-box"
                  name="module-link"
                  type="text"
                  placeholder="Enter URL here"
                  value={ link_to_module }
                  onChange={(event) => { 
                    setLinkToModule(event.target.value);
                  }}
                />
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please describe your issue</label></div>
                <div class="wo-form-data">
                  <input         
                  class="wo-form-text-box"         
                  name="description"
                  type="text"
                  placeholder="What's up?"
                  value={ description }
                  onChange={(event) => { 
                    setDescription(event.target.value);
                  }}        
                 />  
              </div>
            </div>                      
            <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify your computer environment</label></div>
              <div class="wo-form-data">
                <input      
                class="wo-form-text-box"            
                    name="environment"
                    type="text"
                    placeholder="e.g. M1, Vagrant, Windows?"
                    value={ environment }
                    onChange={(event) => { 
                      setEnvironment(event.target.value);
                    }}        
                  />  
              </div>  
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify the category</label></div>
                <div class="wo-form-data">
                <Select 
                 options={state.categories}
                 onChange={handleCategoryChange}
                /> 
                </div>  
              </div>

            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify which module you're working on:</label></div>
              <div class="wo-form-data">  
                <Select 
                  options={state.modules}
                  onChange={handleModuleChange}
                /> 
              </div>  
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please provide a screenshot if applicable:</label></div>
              <div class="wo-form-data">       
                <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange}></input>
              </div>     
            </div>  
            <div class="wo-form-footer">
              <div><Button className="button--danger" danger onClick={ () => { resetFormState() }}>Cancel</Button></div>
              <div><Button className="button--confirm" confirm onClick={ () => { saveData() }}>Save Me</Button></div>
            </div>
        </section> 
        </form> 
      </article>
    </main>
  );
};