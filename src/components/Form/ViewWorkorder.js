// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button"
import useScript from '../../hooks/useScript';
import '../../../public/styles/newWorkOrder.css';
import Select from 'react-select';

//Environment variables
const PORT = process.env.API_PORT;
const HOST = process.env.API_HOST;
const BASE_URL = HOST + ":" + PORT;
const API_CLOUD_ID = process.env.API_CLOUD_ID;
const API_CLOUD_PRESET = process.env.API_CLOUD_PRESET;
  

export default function ViewWorkorder(props){
  const [state, setState] = useState({
    id: "",
    user_student_id: "",
    user_mentor_id: "",
    status_id: "",
    category_id: "",
    module_id: "",
    environment: "",
    description: "",
    screenshot_url: "",
    link_to_module: "",
    escalate: "",
    mentor_notes: "",
    student_notes: "",
    mentor_rating: "",
    student_rating: "",
    date_created: "",
    date_pickup: "",
    date_closed: ""
  });
  
  const workorderId = parseInt(props.workorderId);
  //populate the schedule when the application loads
  useEffect(() => {        
    Promise.all([                       
      axios.get(`http://${BASE_URL}/api/workorders/${workorderId}`),
    ]).then((all) => {    
        //format modules for select box
        
        console.log(all[0].data[0])
        const keys = Object.keys(all[0].data[0]);
        const values = Object.values(all[0].data[0]);
        console.log(keys)
        setState({[keys] : values});      
        console.log("state", state)
      })
    },[])

  
  return (
    <main>
      <article>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <section class="wo-form-container">
            <div class="wo-form-header"><h1>Display Help Request</h1></div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Student Name:</label></div>
              <div class="wo-form-data">{props.student_name}</div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Link to module</label></div>
              <div class="wo-form-data">
      
                
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please describe your issue</label></div>
                <div class="wo-form-data">

              </div>
            </div>                      
            <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify your computer environment</label></div>
              <div class="wo-form-data">
     
              </div>  
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify the category</label></div>
                <div class="wo-form-data">
            
                </div>  
              </div>

            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify which module you're working on:</label></div>
              <div class="wo-form-data">  
         
              </div>  
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please provide a screenshot if applicable:</label></div>
              <div class="wo-form-data">       
               
              </div>     
            </div>  
            <div class="wo-form-footer">
              <div><Button className="button--danger" danger onClick={ () => {  }}>Cancel</Button></div>
  
            </div>
        </section> 
        </form> 
      </article>
    </main>
  );
};