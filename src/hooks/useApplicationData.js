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

    workorderList: [],
    workorderItem: {}
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
        workorderList: all[0].data,
      //  workordersOpen: all[0].data,
        workordersIP: all[1].data,
        workordersClosed: all[2].data,
      }));
    });
  }, []);

  //when a new user logs in, retrieve all of their workorders
  useEffect(() => {
    if (userRole.trim() === "mentor") {
     // getWorkordersByMentorID(userID);
    } else if (userRole.trim() === "student") {
      getWorkordersByStudentID(userID);
    }
  }, [userID]);

  //Update state data when the server sends new data
  const updateQueue = () => {
    Promise.all([
      axios.get(`/api/queue/1`),
      axios.get(`/api/queue/2`),
      axios.get(`/api/queue/3`),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        workorderList: all[0].data,
       // workordersOpen: all[0].data,
        workordersIP: all[1].data,
        workordersClosed: all[2].data,
      }));
    });

  };
  const getWorkorderByID = (workorderID) => {
    return axios.get(`api/workorders/${workorderID}`)
      .then((res) => {
        setState({ ...state, workorder: res.data[0], workorderItem: res.data[0] });
       // setOneWorkorder(res.data[0]);
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByStudentID = (studentID) => {
    console.log("get workorders by student", studentID)
    return axios.get(`api/workorders/student/${studentID}`)
      .then((res) => {
        setState(prev => ({ ...prev, myWorkordersStudent: res.data, workorderList: res.data }));
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByMentorID = (mentorID) => {
    console.log("get workorders mentor", mentorID)
      return axios.get(`api/workorders/mentor/${mentorID}`)
      .then((res) => {
        setState(prev => ({ ...prev, myWorkordersMentor: res.data, workorderList: res.data }));
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByStatus = (statusID) => {
    return axios.get(`/api/queue/${statusID}`)
    .then((res) => {
      setState(prev => ({ ...prev, workorderList: res.data }));
      return;
    }).catch((err) => console.log("axios error", err));
  };

  const changeWorkorderStatus = function(mentor_id, workorder_id) {
    console.log("mentor id", mentor_id)
      //Status id should be set to 1 initially - 
    return axios.put(`http://localhost:8001/api/update/workorder/${workorder_id}`, {user_mentor_id: mentor_id, status_id: 2})
    .then((res) => {
      return;
    }).catch((err) => console.log("error - should show screen"))
      return;
  };

  function isValidEmail(userEmail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
      return true;
    }
    return false;
  }
  // validate that a user enters the email and pw that matches the db -- unencrypted for now bc of our seed data, fix later
  const verifyUserLogin = function(userEmail, userPassword) {
    const cleanEmail = userEmail.trim();
    if (isValidEmail(cleanEmail)) {
      return axios.get(`/api/login/${cleanEmail}`)
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
              return;
            }
          }
        })
        .catch((err) => {
          alert(`There is a database error. Please try again!`);
        });
    } else { // if email is not valid (e.g. it doesn't have an @ sign or is code, etc)
      alert('Your email is invalid'); // may want to use different method than alert, such as toast notification
    }
  };

  return { state, setState, getWorkordersByStudentID, getWorkordersByMentorID, getWorkorderByID, updateQueue, verifyUserLogin, changeWorkorderStatus, getWorkordersByStatus, userID, userRole, oneWorkorder };
}