// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button"
import cloudinary from 'cloudinary-core'
//import "https://upload-widget.cloudinary.com/global/all.js"
//import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import useScript from '../../hooks/useScript';

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
      //axios.get("/api/interviewers")
    ]).then((all) => {    
        //const modules = all[0].data.map((entry, idx) => [{label: entry.id, value: entry.topic}].flatten)
        //console.log("modules",modules)
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
    // const fileUpload = event.target.files[0];
    // console.log(Object.keys(fileUpload))
    // return axios.put(`https://api.cloudinary.com/v1_1/derw4ael5/image/upload`, {file: fileUpload, upload_preset: "iin70vuj"})
    // .then((res) => {
    //   return;
    // }).catch((err) => console.log(err));
  };

  const validate = () => {
    console.log('here', selectedFileUpload)
     return axios.put(`http://localhost:8001/api/workorders`, {user_student_id: 1, status_id: 1, category_id: selectedCategory, module_id: selectedModule, environment: "M1", Description: "Test"})
       .then((res) => {
         return;
       })
     }

     useEffect(() => {        
    console.log("selectedModule", selectedModule)    
  }
  ,[selectedModule])

  const uploadFile = () => {    

    // console.log("upload")
    // return axios.put(`https://api.cloudinary.com/v1_1/derw4ael5/upload`, {file: "test.png", upload_preset: "iin70vuj"})
    //    .then((res) => {
    //      return;
    //    }).catch((err) => console.log(err));
    // cl.upload("sample_file.jpg",
    // { use_filename: true, 
    // unique_filename: false },
    // function(error, result) { console.log(result, error); });
   
    // let myWidget = cloudinary.createUploadWidget({
    //   cloudName: 'derw4ael5'}, (error, result) => { 
    //     if (!error && result && result.event === "success") { 
    //       console.log('Done! Here is the image info: ', result.info); 
    //     } else {
    //       console.log("Cloudinary Error",  error)
    //     }
    //   }
    
   // )
    //myWidget.open()
    // document.getElementById("upload_widget").addEventListener("click", function(){
    // myWidget.open();
    // }, false);
    }

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
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" class="cloudinary_fileupload" onChange={handleFileChange}></input>
          <button id="upload_widget" class="cloudinary-button" onClick={uploadFile}>Upload files</button>
          <input name="file" type="file" class="cloudinary-fileupload" data-cloudinary-field="image_id" 
   data-form-data=" ... upload options as html-escaped JSON data ... " onChange={handleFileChange}></input>
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

<script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>