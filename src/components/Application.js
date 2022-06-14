import React from "react";
import Login from "./Login";
import NewWorkorder from "./Form/NewWorkorder";

import { w3cwebsocket as W3CWebSocket } from "websocket";
//Environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;
const client = new W3CWebSocket(`ws://${BASE_URL}`);

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
  return (
    <>
    <Login  />   
    <NewWorkorder  />    
    </>
  );
}