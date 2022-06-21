import { React, useState, useEffect, Fragment } from "react";
import Login from "./Login";
import NavigationLogin from "./NavigationLogin";
import NavigationStudent from "./NavigationStudent";
import NavigationMentor from "./NavigationMentor";
import NewWorkorder from "./Form/NewWorkorder";
import ViewWorkorder from "./Form/ViewWorkorder";
import WorkorderList from "./WorkorderList";
import QueueList from "./QueueList";
import QueueListHistory from "./QueueListHistory";
import useVisualMode from "../hooks/useVisualMode";
import useUserMode from "../hooks/useUserMode";
import useApplicationData from "../hooks/useApplicationData";
import Footer from "./Footer";
import "./index.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";

//Environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;
const client = new W3CWebSocket(`ws://${BASE_URL}`);

// if user is undefined, show the login page
const SHOW_LOGIN = "SHOW_LOGIN";

// if user is a student, the following modes are available
const SHOW_WO_LIST = "SHOW_WO_LIST";
const SHOW_NEW_WO = "SHOW_NEW_WO";
const SHOW_EXISTING_WO = "SHOW_EXISTING_WO";
const SHOW_USER_STUDENT = "SHOW_USER_STUDENT";
const SHOW_USER_MENTOR = "SHOW_USER_MENTOR";
const SHOW_USER_UNDEFINED = "SHOW_USER_UNDEFINED";

// if user is a mentor, the following modes are available
const SHOW_QUEUE = "SHOW_QUEUE";
const SHOW_IN_PROG = "SHOW_IN_PROG";
const SHOW_CLOSED = "SHOW_CLOSED";
const SHOW_MY_WO = "SHOW_MY_WO";
const SHOW_STUDENT_WO = "SHOW_STUDENT_WO";

// Main component that is responsible for invoking children to display workorder system content
export default function Application(props) {

  // By default, display the login component - the login will determine what the user will ultimately see
  const { mode, transitionView } = useVisualMode(
    SHOW_LOGIN
  );

  // By default, set the user to undefined - the user will be set upon login to mentor or student
  const { user, transitionUser } = useUserMode(SHOW_USER_UNDEFINED);


  // Declare the functions that are being imported via the useApplicationData hook
  const {
    state,
    verifyUserLogin,
    getWorkordersByStudentID,
    getWorkordersByMentorID,
    changeWorkorderStatus,
    getWorkordersByStatus,
    getWorkorderByID,
    deleteLoginCookie,
    deleteMeetingLink,
    resetState,
    getMeetingLink,
    meetingLink,
    userRole,
    cookies,
    userID
  } = useApplicationData();

  const componentDidMount = function() {

    // Update the state to reflect the data sent from the server via websocket
    client.onmessage = (message) => {
      if (mode === SHOW_EXISTING_WO) {
        getWorkorderByID(state.workorderItem.id);
        getMeetingLink(state.workorderItem.id);
      } else {
        updateState();
      }

    };
  };
  componentDidMount();

  const updateState = function() {
    // if user is student
    switch (mode) {
      case SHOW_NEW_WO:
        // Don't need to load any data when creating a new workorder
        break;
      case SHOW_EXISTING_WO:
        // Load form data by workorder id
        break;
      case SHOW_QUEUE:
        // Load in new/open workorders
        getWorkordersByStatus(1);
        break;
      case SHOW_IN_PROG:
        // Load in progress workorders
        getWorkordersByStatus(2);
        break;
      case SHOW_CLOSED:
        // Show closed workorders
        getWorkordersByStatus(3);
        break;
      case SHOW_MY_WO:
        // Show workorders by mentor id
        getWorkordersByMentorID(userID);
        break;
      case SHOW_STUDENT_WO:
        // Show workorders by student id
        break;
      case SHOW_WO_LIST:
        // Show workorders by student id
        getWorkordersByStudentID(userID);

        break;
      default:
        break;
    }
    return;
  };

  useEffect(() => {
    updateState();
  }, [mode]);

  useEffect(() => {
    updateState();
  }, [userID]);

  useEffect(() => {
    setUserView();
  }, [userRole]);

  // Verify that user is in the database and meets credentials. If the userRole has been set to mentor or student, set the view for the user
  const loginUser = function(email, password) {
    verifyUserLogin(email, password);
    if (userRole !== SHOW_USER_UNDEFINED) {
      setUserView();
    }
  };

  // Set relevant views by transitioning based on user role
  const setUserView = function() {
    if (userRole.trim() === "mentor") {
      transitionView(SHOW_QUEUE);
      transitionUser(SHOW_USER_MENTOR);
    } else if (userRole.trim() === "student") {
      transitionView(SHOW_WO_LIST);
      transitionUser(SHOW_USER_STUDENT);
    }
  };

  // Allows a user to view a workorder by its ID
  const openWorkOrder = function(workorder_id) {
    getWorkorderByID(workorder_id);
    transitionView(SHOW_EXISTING_WO);
    return;
  };

  // Allows a mentor to open the workorder history for a specific student
  const openUserHistory = function(student_id) {
    getWorkordersByStudentID(student_id);
    transitionView(SHOW_STUDENT_WO);
    return;
  };

  // Allows a mentor to change the workorder status from "new" to "in progress"
  const markWorkorderInProgress = function(workorder_id) {
    if (userRole.trim() === "mentor") {
      changeWorkorderStatus(userID, 2, workorder_id);
      updateState();
    }
    return;
  };

  // Allows a mentor to change the workorder status from "in progress" to "closed" when finished
  const markWorkorderClosed = function(workorder_id) {
    if (userRole.trim() === "mentor") {
      changeWorkorderStatus(userID, 3, workorder_id);
      deleteMeetingLink(workorder_id);
    }
    return;
  };

  // Deletes a user's cookie when they logout, resets the state, and sets the user and view to their initial default values
  const logout = function() {
    deleteLoginCookie();
    resetState();
    transitionUser(SHOW_USER_UNDEFINED);
    transitionView(SHOW_LOGIN);
    return;
  };

  return (
    <main class="main-container">


      {user === SHOW_USER_STUDENT && (
        <Fragment>
          <NavigationStudent
            email={cookies.user}
            onView={() => transitionView(SHOW_WO_LIST)}
            onNew={() => transitionView(SHOW_NEW_WO)}
            onLogout={logout}
            mode={mode}
          />

          {mode === SHOW_WO_LIST && (
            <WorkorderList
              key={state.workorderList.id}
              workorders={state.workorderList}
              onView={openWorkOrder}
            />)}

          {mode === SHOW_NEW_WO && (
            <NewWorkorder
              student_id={userID}
              student_email={cookies.user}
              onCancel={() => { transitionView(SHOW_WO_LIST); }}
              onSave={() => { transitionView(SHOW_WO_LIST); }}
            />)}

          {mode === SHOW_EXISTING_WO && (
            <ViewWorkorder
              workorder={state.workorderItem}
              meetingLink={meetingLink}
              userRole={userRole.trim()}
              onCancel={() => { transitionView(SHOW_QUEUE); }}
              onHistory={openUserHistory}
              onPickupTicket={markWorkorderInProgress}
              onCloseTicket={markWorkorderClosed}
            />)}

        </Fragment>)}


      {user === SHOW_USER_MENTOR && (
        <Fragment>
          <NavigationMentor
            email={cookies.user}
            onShowNew={() => transitionView(SHOW_QUEUE)}
            onShowInProgress={() => transitionView(SHOW_IN_PROG)}
            onShowClosed={() => transitionView(SHOW_CLOSED)}
            onShowMy={() => { transitionView(SHOW_MY_WO); }}
            onLogout={logout}
            mode={mode}
          />

          {mode === SHOW_MY_WO && (
            < QueueList
              key={state.workorderList.id}
              workorders={state.workorderList}
              onView={openWorkOrder}
              onHistory={openUserHistory}
            />
          )}

          {mode === SHOW_QUEUE && (
            < QueueList
              key={state.workorderList.id}
              workorders={state.workorderList}
              onView={openWorkOrder}
              onHistory={openUserHistory}
              onPickupTicket={markWorkorderInProgress}
            />
          )}

          {mode === SHOW_IN_PROG && (
            < QueueList
              key={state.workorderList.id}
              workorders={state.workorderList}
              onView={openWorkOrder}
              onHistory={openUserHistory}
            />
          )}

          {mode === SHOW_CLOSED && (
            < QueueList
              key={state.workorderList.id}
              workorders={state.workorderList}
              onView={openWorkOrder}
              onHistory={openUserHistory}
            />
          )}

          {mode === SHOW_EXISTING_WO && (
            <ViewWorkorder
              workorder={state.workorderItem}
              meetingLink={meetingLink}
              userRole={userRole.trim()}
              onCancel={() => { transitionView(SHOW_QUEUE); }}
              onHistory={openUserHistory}
              onPickupTicket={markWorkorderInProgress}
              onCloseTicket={markWorkorderClosed}
            />)}


          {mode === SHOW_STUDENT_WO && (
            <QueueListHistory
              key={state.workorderList.id}
              workorders={state.workorderList}
              onView={openWorkOrder}
              onHistory={openUserHistory}
            />)}

        </Fragment>)}


      {mode === SHOW_LOGIN && (
        <Fragment>
          <NavigationLogin />
          < Login
            onLogin={loginUser}
          />
        </Fragment>
      )}

      <Fragment>
        <Footer />
      </Fragment>

    </main>

  );
}

