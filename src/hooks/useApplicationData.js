import { React, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

//function responsible for managing all state changes in the application 
export default function useApplicationData() {
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [oneWorkorder, setOneWorkorder] = useState({});

  const [state, setState] = useState({
    workorderList: [],
    workorderItem: {}
  });

  const deleteLoginCookie = () => {
    console.log("cookie name", cookies.valueName)
    removeCookie('user')
  }
  //populate the queue list when the application loads
  useEffect(() => {

    axios.get(`/api/queue/1`)
    .then((res) => {
      console.log(res.data)
      setState(prev => ({...prev, workorderList: res.data}))
    });
  }, []);

  const getWorkorderByID = (workorderID) => {
    return axios.get(`api/workorders/${workorderID}`)
      .then((res) => {
        setState({ ...state, workorderItem: res.data[0] });
       // setOneWorkorder(res.data[0]);
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByStudentID = (studentID) => {
    return axios.get(`api/workorders/student/${studentID}`)
      .then((res) => {
        setState(prev => ({ ...prev, workorderList: res.data }));
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByMentorID = (mentorID) => {
    return axios.get(`api/workorders/mentor/${mentorID}`)
      .then((res) => {
        setState(prev => ({ ...prev, workorderList: res.data }));
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

  const changeWorkorderStatus = function(mentorID, newStatusID, workorder_id) {
    //Status id should be set to 1 initially - 
    return axios.put(`http://localhost:8001/api/update/workorder/${workorder_id}`, {user_mentor_id: mentorID, status_id: newStatusID})
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

  return { state, setState, getWorkordersByStudentID, getWorkordersByMentorID, getWorkorderByID, verifyUserLogin, changeWorkorderStatus, getWorkordersByStatus, deleteLoginCookie, userID, userRole, oneWorkorder };
}