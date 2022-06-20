import { React, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

// useApplicationData function responsible for managing all state changes in the application 

export default function useApplicationData() {

  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [meetingLink, setMeetingLink] = useState("");

  const [state, setState] = useState({
    workorderList: [],
    workorderItem: {},
  });

  //populate the queue list when the application loads
  useEffect(() => {

    axios.get(`/api/queue/1`)
      .then((res) => {
        setState(prev => ({ ...prev, workorderItem: res.data[0], workorderList: res.data }));
      });
  }, []);

  const getWorkorderByID = (workorderID) => {
    return axios.get(`api/workorders/${workorderID}`)
      .then((res) => {
        console.log(res.data);
        setState(prev => ({ ...prev, workorderItem: res.data[0], workorderList: [] }));
        getMeetingLink(workorderID);
        // setOneWorkorder(res.data[0]);
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByStudentID = (studentID) => {
    return axios.get(`api/workorders/student/${studentID}`)
      .then((res) => {
        console.log("history", res.data);
        setState(prev => ({ ...prev, workorderItem: {}, workorderList: res.data }));
        setMeetingLink("");
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByMentorID = (mentorID) => {
    return axios.get(`api/workorders/mentor/${mentorID}`)
      .then((res) => {
        setState((prev) => ({ ...prev, workorderItem: {}, workorderList: res.data }));
        setMeetingLink("");
        return;
      }).catch((err) => console.log("axios error", err));

  };

  const getWorkordersByStatus = (statusID) => {
    return axios.get(`/api/queue/${statusID}`)
      .then((res) => {
        setState(prev => ({ ...prev, workorderItem: {}, workorderList: res.data }));
        setMeetingLink("");
        return;
      }).catch((err) => console.log("axios error", err));
  };

  const changeWorkorderStatus = function(mentorID, newStatusID, workorder_id) {
    const updates = {
      user_mentor_id: mentorID,
      status_id: newStatusID
    };
    const date = new Date();
    const formatDate = date.toISOString();

    if (newStatusID === 3) {
      updates.date_closed = formatDate;
    } else if (newStatusID === 2) {
      updates.date_pickup = formatDate;
    }
    return axios.post(`/api/update/workorder/${workorder_id}`, updates)
      .then((res) => {
        return;
      }).catch((err) => console.log("error - should show screen"));
  };

  const deleteMeetingLink = function(workorderID) {
    //Status id should be set to 1 initially - 
    console.log("deleteLink", workorderID);
    return axios.post(`/api/meetingLinks/${workorderID}`)
      .then((res) => {
        return;
      }).catch((err) => console.log("error - should show screen"));
  };

  const resetState = function(workorderID) {
    setState({ workorderList: [], workorderItem: {} });
    setMeetingLink("");
    //   setUserID("");
  };

  const getMeetingLink = (workorderID) => {
    return axios.get(`/api/meetingLinks/${workorderID}`)
      .then((res) => {
        if (res.data.length) {
          setMeetingLink(res.data[0].meeting_link);
        }
        return;
      })
      .catch(error => {
        console.error(error);
      });

  };

  // Uses RegEx to validate if email entered into input field of login is an email address
  function isValidEmail(userEmail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
      return true;
    }
    return false;
  }

  // Validates that a user enters the email and passwordw that matches the database
  const verifyUserLogin = function(userEmail, userPassword) {
    const cleanEmail = userEmail.trim();

    // If the text entered in the email field is an email address, then fetch the user data for that email 
    if (isValidEmail(cleanEmail)) {
      return axios.get(`/api/login/${cleanEmail}`)
        .then((response) => {
          // if the response data is empty, a user with that email address was not found
          if (response.data.length === 0) {
            alert('The user was not found.');
          }
          // if the response data length is greater than one, there were multiple users for that email address (which should not happen)
          else if (response.data.length > 1) {
            alert('Internal server error');
          } else {
            // Password is checked here. Unencrypted for the scope of this project
            // Would utilize a secuity management platform such as Auth0 if use case expanded in the future
            if (userPassword === response.data[0].password) {
              setCookie("user", userEmail, { path: "/" });
              setUserID(response.data[0].id);
              setUserRole(response.data[0].role);
              return;
            }
          }
        })
        // if there is an error with fetching the user data, alert the user that there was a database error
        .catch((err) => {
          alert(`There is a database error. Please try again!`);
        });
    } else {
      // if email is not valid (e.g. it doesn't have an @ sign or is code, etc) alert the user that the email is invalid
      alert('Your email is invalid');
    }
  };

  // Removes the cookie set for a user when they log out
  const deleteLoginCookie = () => {
    removeCookie('user');
  };

  return { state, setState, getWorkordersByStudentID, getWorkordersByMentorID, getWorkorderByID, verifyUserLogin, changeWorkorderStatus, getWorkordersByStatus, deleteLoginCookie, deleteMeetingLink, resetState, getMeetingLink, userID, userRole, meetingLink, cookies };
}