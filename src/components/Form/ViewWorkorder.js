// form when student is creating a new workorder
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import Button from "../Button"
import useScript from '../../hooks/useScript';
import './workorderForm.css';
import Select from 'react-select';

//Environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;

  

export default function ViewWorkorder(props){
  console.log("single WO", props)
  const {workorder, onCancel } = props
  return (
    <main>
    <article>
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <section class="wo-form-container">
          <div class="wo-form-header"><h1>View Help Request</h1></div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Student Name:</label></div>
            <div class="wo-form-data">{workorder[0].student_first_name + " " + workorder[0].student_last_name}</div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Link to module</label></div>
            <div class="wo-form-data">
            {workorder[0].link_to_module}    
            </div>
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please describe your issue</label></div>
              <div class="wo-form-data">
              {workorder[0].description}
            </div>
          </div>                      
          <div class="wo-form-label-data">
          <div class="wo-form-label"><label>Please specify your computer environment</label></div>
            <div class="wo-form-data">
            {workorder.environment}
            </div>  
          </div>
          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify the category</label></div>
              <div class="wo-form-data">
              {workorder.category}
              </div>  
            </div>

          <div class="wo-form-label-data">
            <div class="wo-form-label"><label>Please specify which module you're working on:</label></div>
            <div class="wo-form-data">  
             {workorder.topic}
            </div>  
          </div>
          <div class="wo-form-screenshot">       
                <a href={workorder.screenshot_url}>
                  <img src={workorder.screenshot_url} alt="Error Screenshot" />
                </a>
              </div>   
              <div class="wo-form-footer">
              <div><Button className="button--danger" danger onClick={ () => {  }}>Cancel</Button></div>
              <div><Button className="button--confirm" confirm onClick={ () => {  }}>See History</Button></div>
              <div><Button className="button--confirm" confirm onClick={ () => {  }}>Pick Up</Button></div>
            </div>
      </section> 
      </form> 
    </article>
  </main>
  );
};