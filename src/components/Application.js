import React from "react";
import Login from "./Login";
import Navigation from "./Navigation";
import NewWorkorder from "./Form/NewWorkorder";
import WorkorderList from "./WorkorderList";
import useVisualMode from "../hooks/useVisualMode";

import { w3cwebsocket as W3CWebSocket } from "websocket";
//Environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;
const client = new W3CWebSocket(`ws://${BASE_URL}`);

const SHOW_WO_LIST = "SHOW_WO_LIST";
const SHOW_LOGIN = "SHOW_LOGIN";

/*TESTING PROPS********************************************************************** */

const users = [
  {
    id: 8,
    first_name: "John",
    last_name:"Doe",
    email:"johndoe@gmail.com",
    cohort_id: 7,
    handle: "jndoe" ,
    avatar: "",
    role: "student",
    password: "password",
    active: true,
    join_date: "2018-03-14T13:00:00.000Z"
  },
  {
    id: 4,
    first_name: "Mentor",
    last_name:"Doe",
    email:"mentorndoe@gmail.com",
    cohort_id: 2,
    handle: "mentordoe" ,
    avatar: "",
    role: "mentor",
    password: "password",
    active: true,
    join_date: "2015-03-14T13:00:00.000Z"
  }];
  
  const modules = [
  {
    id: 1,
    week: 1,
    day: 1,
    topic:"Organizing Our Code",
    archive: false
  },
  {
  id: 3,
  week: 2,
  day: 4,
  topic:"Harder Topic",
  archive: false
  }
  ];
  
  const workorders = [
  { id: 4,
    user_student_id: 8,
    user_mentor_id: 4,
    status_id: 1,
    category_id: 1,
    module_id: 3,
    environment: "M1",
    description: "Code review please",
    screenshot: "https://res.cloudinary.com/derw4ael5/image/upload/v1655305553/nitjdpqd83nu8cgrhyyv.png",
    link_to_module: "www.google.com",
    escalate: false,
    mentor_notes: "Not bad coding style, but there were some arries that could be more 'DRY'. Recommended helper functions",
    student_notes: "Meh",
    mentor_rating: 5,
    student_rating: 3,
    date_created: "2018-03-14T12:00:00.000Z",
    date_pickup: "2018-03-14T12:03:00.000Z",
    date_closed: "2018-03-14T13:00:00.000Z"
  },
  {
    id: 3,
    user_student_id: 2,
    user_mentor_id: 4,
    status_id: 1,
    category_id: 2,
    module_id: 3,
    environment: "WSL",
    description: "Discussion",
    screenshot: null,
    link_to_module: null,
    escalate: false,
    mentor_notes: "M1 issue - needed to change package.json as per Francis' recommendation ",
    student_notes: "Mentor fixed problem super quick",
    mentor_rating: 1,
    student_rating: 1,
    date_created: "2018-03-13T12:00:00.000Z",
    date_pickup: "2018-03-13T12:03:00.000Z",
    date_closed: "2018-03-13T13:00:00.000Z",
    student_first_name: "Jane",
    student_last_name: "Doe",
    mentor_first_name: "Patricia",
    mentor_last_name: "Anderson",
    week: 1,
    day: 1,
    topic: "Bootcamp Reference Guide"
    },
    {
    id: 12,
    user_student_id: 1,
    user_mentor_id: 19,
    status_id: 1,
    category_id: 1,
    module_id: 3,
    environment: "M1",
    description: "Code review",
    screenshot: null,
    link_to_module: null,
    escalate: false,
    mentor_notes: "Not bad coding style, but there were some arries that could be more 'DRY'. Recommended helper functions",
    student_notes: "Meh",
    mentor_rating: 5,
    student_rating: 3,
    date_created: "2018-03-14T12:00:00.000Z",
    date_pickup: "2018-03-14T12:03:00.000Z",
    date_closed: "2018-03-14T13:00:00.000Z",
    student_first_name: "John",
    student_last_name: "Doe",
    mentor_first_name: "Patricia",
    mentor_last_name: "Anderson",
    week: 1,
    day: 1,
    topic: "Bootcamp Reference Guide"
    }
  ];

  /********************************************************************** */
//Set up websocket client connection
const componentDidMount = function () {
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
}
componentDidMount();
//Main component that is responsible for invoking children to display workorder system content
export default function Application(props) {
  //declare the functions that are being exported in the useApplicationData hook
  //Display the login component - the login will determine what the user will ultimately see

  const { mode, transition } = useVisualMode(
    SHOW_LOGIN
  );

  return (
    <>
    <Navigation />

    {mode !== SHOW_WO_LIST && (<Login  
      onSuccess={() => transition(SHOW_WO_LIST)}
    />)}   

    {mode === SHOW_WO_LIST && (
          <WorkorderList
            workorders={workorders}
            users = {users}
            modules = {modules}
          />)}    
    
    </>
  );
}