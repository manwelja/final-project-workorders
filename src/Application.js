import React from "react";

import NewWorkOrder from "./Form/NewWorkorder";
import WorkOrderList from "./WOrkOrderList";

import { w3cwebsocket as W3CWebSocket } from "websocket";

//Environment variables
const PORT = process.env.REACT_API_PORT;
const HOST = process.env.REACT_API_HOST;
const BASE_URL = HOST + ":" + PORT;

const client = new W3CWebSocket(`ws://${BASE_URL}`);
console.log("loading ")

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

//componentDidMount();
// <UserList users={state.users} />
//Maain component that is responsible for invoking children to display navigation and schedule content
export default function Application(props) {
  //declare the functions that are being exported in the useApplicationData hook
  return (
    <main className="layout">
     <WorkOrderList  />  
     <NewWorkOrder  />     
    </main>
  );
}