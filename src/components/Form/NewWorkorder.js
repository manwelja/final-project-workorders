// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button"
import cloudinary from 'cloudinary-core'
//import "https://upload-widget.cloudinary.com/global/all.js"
//import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import useScript from '../../hooks/useScript';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

export default function NewWorkorder(props){
  useScript('https://upload-widget.cloudinary.com/global/all.js');

  const [module, setModule] = useState([{}]);
  const [selectedModule, setSelectedModule] = React.useState({selectedModule: ""});
  const [category, setCategory] = useState([{}]);
  const [selectedCategory, setSelectedCategory] = React.useState({selectedCategory: ""});
  const [fileUpload, setfileUpload] = useState([{}]);
  const [selectedFileUpload, setSelectedFileUpload] = React.useState({selectedFileUpload: ""});
  const PORT = process.env.API_PORT;
  const HOST = process.env.API_HOST;
  const BASE_URL = HOST + ":" + PORT;
  var cl = new cloudinary.Cloudinary({cloud_name: "derw4ael5", secure: true});
console.log(cl)
  //populate the schedule when the application loads
  useEffect(() => {        
    Promise.all([                       
      axios.get(`http://${BASE_URL}/api/modules`),
      axios.get(`http://${BASE_URL}/api/categories`),
    ]).then((all) => {    
        const modules = all[0].data;
        const category = all[1].data;
        setModule(modules);     
        setCategory(category);        
      })
    },[])

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFileUpload(event.target.files[0]);
  };

  function saveData() {
    console.log("selected Fiel", selectedFileUpload);
    const url = `https://api.cloudinary.com/v1_1/derw4ael5/upload`;
    const fd = new FormData();
    fd.append("upload_preset", "iin70vuj");
    fd.append("tags", "workorder_system_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", selectedFileUpload);
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };
    return axios.post(url, fd, config)
        .then((res) => {
            postToDatabase(res.data.secure_url);
    }).catch((err) => console.log(err));    
  }
 
  const postToDatabase = (filePath) => {
    return axios.put(`http://localhost:8001/api/workorders`, {user_student_id: 1, status_id: 1, category_id: parseInt(selectedCategory), module_id: parseInt(selectedModule), environment: "M1", Description: "Test", student_notes: filePath})
    .then((res) => {
    console.log(res)
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
                <label>Link to instructions</label>
                <br />
                <input
                  name="link"
                  type="text"
                  placeholder="Enter URL here"
                  style={{ width: "500px" }}
                />
              </section>

              <section>
                <label>Please describe your issue</label>
                <input
                  name="description"
                  type="text"
                  placeholder="Tell us what's up"
                  style={{ width: "500px", height: "200px" }}
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
              <select value={selectedCategory} onChange={handleCategoryChange}>
                {category.map((option) => (
                <option key={option.id} value={option.id}>{option.description}</option>
                ))}
              </select> 
            </section>

            <section>
              <p>Please specify which module you're working on:</p>  
              <select value={selectedModule} onChange={handleModuleChange}>
                {module.map((option) => (
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