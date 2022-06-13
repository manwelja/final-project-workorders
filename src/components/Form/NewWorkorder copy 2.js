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

  function onFileSelected(event) {
    console.log('here')
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    let imgtag = {};
    //var imgtag = document.getElementById("myimage");
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
  
    //reader.readAsDataURL(selectedFile);
    const upload = reader.readAsDataURL(selectedFile);

  //   var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  // var fd = new FormData();
  // fd.append("upload_preset", unsignedUploadPreset);
  // fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
  // fd.append("file", file);
  // const config = {
  //   headers: { "X-Requested-With": "XMLHttpRequest" },
  //   onUploadProgress: function(progressEvent) {
  //     // Do whatever you want with the native progress event
  //     // console.log('progressEvent', progressEvent);
  //     var progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
  //     document.getElementById('progress').style.width = progress + "%";

  //     console.log(`onUploadProgress progressEvent.loaded: ${progressEvent.loaded},
  //   progressEvent.total: ${progressEvent.total}`);
  //   }
  // };
  // axios.post(url, fd, config)


    return axios.post(`https://api.cloudinary.com/v1_1/derw4ael5/image/upload`, {file: selectedFile, upload_preset: "iin70vuj"})
    .then((res) => {
      return;
    }).catch((err) => console.log(err));
  }

  const validate = () => {
    console.log('here', selectedFileUpload)
     return axios.put(`http://localhost:8001/api/workorders`, {user_student_id: 1, status_id: 1, category_id: parseInt(selectedCategory), module_id: parseInt(selectedModule), environment: "M1", Description: "Test", screenshot: selectedFileUpload})
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
    <>
    <head><script src="https://media-library.cloudinary.com/global/all.js"></script></head>
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
            </section>

            <br />
            <br />
            <div class="my_article" contenteditable>aaa</div>
            <section>
              <form>
                <label>Optional: Upload screenshot(s)</label>
                <br />
                <button id="upload_widget">Upload files</button>
                <br />
                <br />
              </form>
            </section>
          </section>
          <br />
          <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange}></input>

        <input type="file" onChange={onFileSelected}></input>
        </form>
        <section>
          <button>Cancel</button>
          <Button confirm onClick={ () => { validate() }}>Save Me</Button>
        </section>
      </article>
    </main>
    </>  
  );
};