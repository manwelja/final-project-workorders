import { useState, useEffect } from "react";
import axios from "axios";

//function responsible for managing all state changes in the application 
export default function useApplicationData() {

  const [state, setState] = useState({
    workordersOpen: [],
    workordersIP: [],
    workordersClosed: [],
    workorder: {}    
  });

    //populate the schedule when the application loads
    useEffect(() => {        
      Promise.all([      
        axios.get(`/api/queue/1`),
        axios.get("/api/queue/1"),
        axios.get("/api/queue/1")
      ]).then((all) => {          
        setState(prev => ({...prev, workordersOpen:all[0].data, workordersIP:all[1].data, workordersClosed: all[2].data}));
      })
    },[])

   const getQueueListByStatus = function (workorderStatus) {
  //   //add the new interview to the scheduler api
  //   //return the promise so we can update the schedule page AFTER the api is updated
  //   return axios.get(`/api/workorders/${workorderStatus}`)
  //     .then((res) => {
  //        setState({...state, res});        
  //        //return;
  //     })
     }


  const getQueueListByMentor = function (mentorID) {

  }

  const getWorkorderListByStudent = function(studentID) {

  }
  
  const getWorkorderByID = function(workorderID) {


  }
  return { state, getQueueListByStatus, getQueueListByMentor, getWorkorderListByStudent, getWorkorderByID };
}