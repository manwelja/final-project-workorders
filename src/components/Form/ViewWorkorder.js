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
    screenshot_url: null,
    link_to_module: null,
    escalate: "",
    mentor_notes: "",
    student_notes: "",
    mentor_rating: "",
    student_rating: "",
    date_created: "",
    date_pickup: "",
    date_closed: "",
    student_first_name: "",
    student_last_name: "",
    mentor_first_name: "",
    mentor_last_name: "",
    category: "",
    week: "",
    day: "",
    topic: ""
  });
  
  const workorderId = 27; //parseInt(props.workorderId);
  //populate the schedule when the application loads
  useEffect(() => {        
    Promise.all([                       
      axios.get(`http://${BASE_URL}/api/workorders/${workorderId}`),
    ]).then((all) => {    
        const newState = all[0].data[0];
        setState({...state, ...newState})
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
              <div class="wo-form-data">{state.student_first_name + " " + state.student_last_name}</div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Link to module</label></div>
              <div class="wo-form-data">
                {state.link_to_module}                
              </div>
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please describe your issue</label></div>
                <div class="wo-form-data">
                {state.description}
              </div>
            </div>                      
            <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify your computer environment</label></div>
              <div class="wo-form-data">
                {state.environment}
              </div>  
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify the category</label></div>
                <div class="wo-form-data">
                  {state.category}
                </div>  
            </div>

            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Please specify which module you're working on:</label></div>
              <div class="wo-form-data">  
                {state.topic}
              </div>  
            </div>
            <div class="wo-form-label-data">
              <div class="wo-form-label"><label>Screenshot:</label></div><div></div>
               <div class="wo-form-label">       
                <a href={state.screenshot_url}>
                  <img src={state.screenshot_url} alt="Error Screenshot" />
                </a>
              </div>     
              <div class="wo-form-label"></div>
            </div>  
            <div class="wo-form-footer">
              <div><Button className="button--danger" danger onClick={ () => {  }}>Cancel</Button></div>
              <div><Button className="button--confirm" confirm onClick={ () => {  }}>See History</Button></div>
              <div><Button className="button--confirm" confirm onClick={ () => {  }}>Pick Up Ticket</Button></div>
            </div>
        </section> 
        </form> 
      </article>
    </main>
  );
};