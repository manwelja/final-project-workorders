import React from "react";
import QueueListItem from "components/QueueListItem";

//Component that invokes a QueueListItem child for each workorder in the data set
export default function QueueList(props) {
  const queueItem = props.workorders.map((workOrderData) => {
    //return a populated Queuelist item for each workorder in the data set
    return(
      <QueueListItem
          key={ workOrderData.id }
          environment={ workOrderData.environment } 
          description={ workOrderData.description } 
          dateCreated={ workOrderData.date_created }
          studentFirstName= { workOrderData.student_first_name }
          studentLastName= { workOrderData.student_last_name }
          topic= { workOrderData.topic }
        />) 
    });

    return(
      <ul>{ queueItem }</ul>
    )

};
