import { React, useState, useEffect, Fragment } from "react";
import Login from "./Login";
import NavigationStudent from "./NavigationStudent";
import NavigationMentor from "./NavigationMentor";
import NewWorkorder from "./Form/NewWorkorder";
import ViewWorkorder from "./Form/ViewWorkorder";
import WorkorderList from "./WorkorderList";
import QueueList from "./QueueList";
import useVisualMode from "../hooks/useVisualMode";
import useUserMode from "../hooks/useUserMode";
import useApplicationData from "../hooks/useApplicationData";
import axios from "axios";

import { w3cwebsocket as W3CWebSocket } from "websocket";
//Environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;
const client = new W3CWebSocket(`ws://${BASE_URL}`);

// if user is undefined
const SHOW_LOGIN = "SHOW_LOGIN";

// if user is student
const SHOW_WO_LIST = "SHOW_WO_LIST";
const SHOW_NEW_WO = "SHOW_NEW_WO";
const SHOW_EXISTING_WO = "SHOW_EXISTING_WO";
const SHOW_USER_STUDENT = "SHOW_USER_STUDENT";
const SHOW_USER_MENTOR = "SHOW_USER_MENTOR";
const SHOW_USER_UNDEFINED = "SHOW_USER_UNDEFINED";

// if user is mentor
const SHOW_QUEUE = "SHOW_QUEUE";
const SHOW_IN_PROG = "SHOW_IN_PROG";
const SHOW_CLOSED = "SHOW_CLOSED";
const SHOW_MY_WO = "SHOW_MY_WO";

//Main component that is responsible for invoking children to display workorder system content
export default function Application(props) {
  //declare the functions that are being exported in the useApplicationData hook
  //Display the login component - the login will determine what the user will ultimately see

  const { mode, transitionView } = useVisualMode(
    SHOW_LOGIN
  );

  const { user, transitionUser } = useUserMode(SHOW_USER_UNDEFINED);
  // need users: mentor, student, unknown for the different views


  //declare the functions that are being exported in the useApplicationData hook
  const {
    state,
    setState,
    oneWorkorder,
    verifyUserLogin,
    updateAllStates,
    getWorkordersByStudentID,
    getWorkordersByMentorID,
    getWorkorderByID,
    userRole
  } = useApplicationData();

  const componentDidMount = function() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    //Update the state to reflect the data sent from the server via websocket
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      //save this data to state to refresh screen
      console.log(dataFromServer.message);
      updateAllStates();
    };
  };
  componentDidMount();

  const loginUser = function(email, password) {
    verifyUserLogin(email, password);
    setUserView();
    // return;
  };
  const setUserView = function() {
    console.log(userRole.trim());
    if (userRole.trim() === "mentor") {
      transitionView(SHOW_QUEUE);
      transitionUser(SHOW_USER_MENTOR);
      //getWorkordersByMentorID(userID) 
    } else if (userRole.trim() === "student") {
      transitionView(SHOW_WO_LIST);
      transitionUser(SHOW_USER_STUDENT);
      //getWorkordersByStudentID(userID) 
    }
    //return;
  };

  // useEffect(() => {
  //   console.log("chaneg user");
  //   if (userRole.trim() === "mentor") {
  //     transitionView(SHOW_QUEUE);
  //     transitionUser(SHOW_USER_MENTOR);
  //     //getWorkordersByMentorID(userID) 
  //   } else if (userRole.trim() === "student") {
  //     transitionView(SHOW_WO_LIST);
  //     transitionUser(SHOW_USER_STUDENT);
  //     //getWorkordersByStudentID(userID) 
  //   }
  //   return;
  // }, [userRole]);

  const openWorkOrder = function(workorder_id) {
    getWorkorderByID(workorder_id);
    transitionView(SHOW_EXISTING_WO);
    return;
  };

  return (
    <Fragment>


      {user === SHOW_USER_STUDENT && (
        <Fragment>
          <NavigationStudent
            onView={() => transitionView(SHOW_WO_LIST)}
            onNew={() => transitionView(SHOW_NEW_WO)}
            onLogout={() => { transitionUser(SHOW_USER_UNDEFINED); transitionView(SHOW_LOGIN); }}
          />

          {mode === SHOW_WO_LIST && (
            <WorkorderList
              workorders={state.myWorkordersStudent}
              onView={openWorkOrder}
            />)}

          {mode === SHOW_NEW_WO && (
            <NewWorkorder
              onCancel={() => { transitionView(SHOW_WO_LIST); }}
              onSave={() => { transitionView(SHOW_EXISTING_WO); }}
            />)}

          {mode === SHOW_EXISTING_WO && (
            <ViewWorkorder
              workorder={state.workorder}
              onCancel={() => { transitionView(SHOW_WO_LIST); }}
            />)}

        </Fragment>)}


      {user === SHOW_USER_MENTOR && (
        <Fragment>
          <NavigationMentor
            onShowNew={() => transitionView(SHOW_QUEUE)}
            onShowInProgress={() => transitionView(SHOW_IN_PROG)}
            onShowClosed={() => transitionView(SHOW_CLOSED)}
            onShowMy={() => { transitionView(SHOW_MY_WO); }}
            onLogout={() => { transitionUser(SHOW_USER_UNDEFINED); transitionView(SHOW_LOGIN); }}
          />

          {(mode === SHOW_QUEUE) && (
            < QueueList
              workorders={state.workordersOpen}
            />
          )}

          {(mode === SHOW_IN_PROG) && (
            < QueueList
              workorders={state.workordersIP}
            />
          )}

          {(mode === SHOW_CLOSED) && (
            < QueueList
              workorders={state.workordersClosed}
            />
          )}

          {mode === SHOW_MY_WO && (
            < QueueList
              workorders={state.myWorkordersMentor}
            />
          )}

        </Fragment>)}

      {mode === SHOW_LOGIN && (
        < Login
          onLogin={loginUser}
        />
      )}

    </Fragment>
  );
}

