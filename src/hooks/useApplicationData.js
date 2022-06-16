import { React, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

//function responsible for managing all state changes in the application 
export default function useApplicationData() {
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");
  const [cookies, setCookie] = useCookies([""]);
  const [oneWorkorder, setOneWorkorder] = useState({});

  const [state, setState] = useState({
    workordersOpen: [],
    workordersIP: [],
    workordersClosed: [],
    myWorkordersStudent: [],
    myWorkordersMentor: [],
    workorder: {},
    userID: null
  });

  //populate the queue list when the application loads
  useEffect(() => {
    Promise.all([
      axios.get(`/api/queue/1`),
      axios.get("/api/queue/2"),
      axios.get("/api/queue/3"),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        workordersOpen: all[0].data,
        workordersIP: all[1].data,
        workordersClosed: all[2].data,
      }));
    });
  }, []);

  //when a new user logs in, retrieve all of their workorders
  useEffect(() => {
      if(userRole.trim() === "mentor") {
        getWorkordersByMentorID(userID);
      } else if (userRole.trim() === "student") {
        getWorkordersByStudentID(userID);
      }
    }, [userID]);

//Update state data when the server sends new data
    const updateAllStates = () => {
      Promise.all([
        axios.get(`/api/queue/1`),
        axios.get("/api/queue/2"),
        axios.get("/api/queue/3"),
      ]).then((all) => {
        setState(prev => ({
          ...prev,
          workordersOpen: all[0].data,
          workordersIP: all[1].data,
          workordersClosed: all[2].data,
        }));
      });

    }
    const getWorkorderByID = (workorderID) => {
      return axios.get(`api/workorders/${workorderID}`)
        .then((res) => {          
          console.log("one workorder", res.data[0])
          setState({...state, workorder: res.data[0]})
          setOneWorkorder(res.data[0]);  
          return;        
        }).catch((err) => console.log("axios error", err));
  
    };
    useEffect(() => {
     console.log("workorder change", oneWorkorder)
    }, [oneWorkorder]);

    useEffect(() => {
      console.log("state change", state)
     }, [state]);

    const getWorkordersByStudentID = (studentID) => {
    return axios.get(`api/workorders/student/${studentID}`)
      .then((res) => {
        setState(prev => ({ ...prev, myWorkordersStudent: res.data }));
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByMentorID = (mentorID) => {
    console.log("mentor id", mentorID);
    return axios.get(`api/workorders/mentor/${mentorID}`)
      .then((res) => {
        setState(prev => ({ ...prev, myWorkordersMentor: res.data }));
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

  return { state, setState, getWorkordersByStudentID, getWorkordersByMentorID, getWorkorderByID, updateAllStates, verifyUserLogin, userID, userRole, oneWorkorder };
}