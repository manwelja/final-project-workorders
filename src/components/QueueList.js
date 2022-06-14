import React from "react";
import QueueListItem from "components/QueueListItem";

//Component that invokes a QueueListItem child for each workorder in the data set
export default function QueueList(props) {
  const queueItem = props.workorders.map((workOrderData, idx) => {
    //return a populated Queuelist item for each workorder in the data set
    return (
      <QueueListItem class="queue-container"
        key={workOrderData.id}
        numInQueue={idx + 1}
        environment={workOrderData.environment}
        description={workOrderData.description}
        dateCreated={workOrderData.date_created}
        studentFirstName={workOrderData.student_first_name}
        studentLastName={workOrderData.student_last_name}
        topic={workOrderData.topic}
        week={workOrderData.week}
        screenshot_url={workOrderData.screenshot_url}
      />
    ); 
  });

  return (
    <ul>{queueItem}</ul>
  );

};
