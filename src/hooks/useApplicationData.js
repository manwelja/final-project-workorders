import { React, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

//function responsible for managing all state changes in the application 
export default function useApplicationData() {
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");
  const [cookies, setCookie] = useCookies([""]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, setState] = useState({
    workordersOpen: [],
    workordersIP: [],
    workordersClosed: [],
    myWorkordersStudent: [],
    myWorkordersMentor: [],
    workorder: {},
    userID: null
  });

  //populate the schedule when the application loads
  useEffect(() => {
    Promise.all([
      axios.get(`/api/queue/1`),
      axios.get("/api/queue/2"),
      axios.get("/api/queue/3"),
      axios.get(`api/workorders/student/1`),
      axios.get(`api/workorders/mentor/4`)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        workordersOpen: all[0].data,
        workordersIP: all[1].data,
        workordersClosed: all[2].data,
        myWorkordersStudent: all[3].data,
        myWorkordersMentor: all[4].data
      }));
    });
  }, []);

  const getQueueListByStatus = function(workorderStatus) {
    //   //add the new interview to the scheduler api
    //   //return the promise so we can update the schedule page AFTER the api is updated
    //   return axios.get(`/api/workorders/${workorderStatus}`)
    //     .then((res) => {
    //        setState({...state, res});        
    //        //return;
    //     })
  };


  const getQueueListByMentor = function(mentorID) {

  };

  const getWorkorderListByStudent = function(studentID) {

  };

  const getWorkordersByStudentID = (studentID) => {
    console.log("student id", studentID);
    return axios.get(`api/workorders/student/${studentID}`)
      .then((res) => {
        setState(prev => ({ ...prev, myWorkorders: res.data }));
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByMentorID = (mentorID) => {
    console.log("mentor id", mentorID);
    return axios.get(`api/workorders/mentor/${mentorID}`)
      .then((res) => {
        setState(prev => ({ ...prev, myWorkorders: res.data }));
        return;
      }).catch((err) => console.log("axios error", err));

  };

function isValidEmail(userEmail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
    return true;
  }
  return false;
}
// validate that a user enters the email and pw that matches the db -- unencrypted for now bc of our seed data, fix later
// may want to migrate this to backend in the future? 
  const verifyUserLogin = function(userEmail, userPassword) {
    console.log("login user")
    const cleanEmail = userEmail.trim();
    if (isValidEmail(cleanEmail)) {
      axios.get(`/api/login/${cleanEmail}`)
        .then((response) => {
          if (response.data.length === 0) {
            alert('The user was not found.');
          }
          else if (response.data.length > 1) {
            alert('Internal server error');
          } else {
            // validate password here
            if (userPassword === response.data[0].password) { // TO DO: ENCRYPT
              setCookie("user", userEmail, { path: "/" });
              setUserID(response.data[0].id);  
              setUserRole(response.data[0].role);              
            }
          }
        })
        .catch((err) => {
          alert(`There is a database error. Please try again!`);
        });
    } else { // if email is not valid (e.g. it doesn't have an @ sign or is code, etc)
      alert('Your email is invalid'); // may want to use different method than alert, such as toast notification
    }
  }

  return { state, getQueueListByStatus, getQueueListByMentor, getWorkorderListByStudent, getWorkordersByStudentID, getWorkordersByMentorID, verifyUserLogin, userID, userRole };
}