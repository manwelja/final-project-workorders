import React, { Fragment } from "react";
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

// if user is mentor
const SHOW_QUEUE = "SHOW_QUEUE";
const SHOW_IN_PROG = "SHOW_IN_PROG";
const SHOW_CLOSED = "SHOW_CLOSED";
const SHOW_MY_WO = "SHOW_MY_WO";

const users = [];
const modules = [];
const workorders = [];
/********************************************************************** */
//Set up websocket client connection
const componentDidMount = function() {
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  //Update the state to reflect the data sent from the server via websocket
  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    //save this data to state to refresh screen
    console.log(dataFromServer);
    // if (dataFromServer.type === "message") {
    //   this.setState((state) =>
    //     ({
    //       messages: [...state.messages,
    //       {
    //         msg: dataFromServer.msg,
    //         user: dataFromServer.user
    //       }]
    //     })
    //   );
    //}
  };
};
componentDidMount();
//Main component that is responsible for invoking children to display workorder system content
export default function Application(props) {
  //declare the functions that are being exported in the useApplicationData hook
  //Display the login component - the login will determine what the user will ultimately see

  const { mode, transitionView } = useVisualMode(
    SHOW_LOGIN
  );

  const { user, transitionUser } = useUserMode('');
  // need users: mentor, student, unknown for the different views


  //declare the functions that are being exported in the useApplicationData hook
  const {
    state,
    setState,
    getQueueListByStatus,
    getQueueListByMentor,
    getWorkorderListByStudent,
    getWorkordersByStudentID,
    getWorkordersByMentorID
  } = useApplicationData();

  //potentially used to store userID on login
  const getUserID = (id) => {
    setState(prev => ({ ...prev, userID: id }));
  };

  console.log("user", user);
  console.log("mode", mode);
  //return appointment components for each appoiontment that exists for the currently selected day
  // const queueOpen = getQueueListByStatus(1);
  // const queueInProgress = getQueueListByStatus(2);
  // const queueClosed = getQueueListByStatus(3);
  return (
    <Fragment>
      {
        mode === SHOW_LOGIN && (<Login
          onSuccessStudent={() => {
            transitionView(SHOW_WO_LIST);
            transitionUser(SHOW_USER_STUDENT);
          }}
          onSuccessMentor={() => {
            transitionView(SHOW_QUEUE);
            transitionUser(SHOW_USER_MENTOR);
          }}
        />)
      }

      {user === SHOW_USER_STUDENT && (
        <Fragment>
          <NavigationStudent
            onView={() => transitionView(SHOW_WO_LIST)}
            onNew={() => transitionView(SHOW_NEW_WO)}
            onLogout={() => transitionView(SHOW_LOGIN)}
          />

          {mode === SHOW_WO_LIST && (
            <WorkorderList
              workorders={state.myWorkordersStudent}
            />)}

          {mode === SHOW_NEW_WO && (
            <NewWorkorder
              onCancel={() => { transitionView(SHOW_WO_LIST); }}
              onSave={() => { transitionView(SHOW_EXISTING_WO); }}
            />)}

          {mode === SHOW_EXISTING_WO && (
            <WorkorderList
              workorders={workorders}
              users={users}
              modules={modules}
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
            onLogout={() => transitionView(SHOW_LOGIN)}
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


    </Fragment>
  );
}

