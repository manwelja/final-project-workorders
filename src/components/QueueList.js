import React from "react";
import QueueListItem from "./QueueListItem";

//Component that invokes a QueueListItem child for each workorder in the data set
export default function QueueList(props) {
  const { onView, onHistory, workorders, onPickupTicket } = props;

  const queueItem = workorders.map((workOrderData, idx) => {
    //return a populated Queuelist item for each workorder in the data set
    return (
      <QueueListItem class="queue-container"
        key={workOrderData.id}
        numInQueue={idx + 1}
        environment={workOrderData.environment}
        description={workOrderData.description}
        date_created={workOrderData.date_created}
        student_first_name={workOrderData.student_first_name}
        student_last_name={workOrderData.student_last_name}
        topic={workOrderData.topic}
        week={workOrderData.week}
        screenshot_url={workOrderData.screenshot_url}
        onView={onView}
        workorder_id={workOrderData.id}
        student_id={workOrderData.user_student_id}
        onHistory={onHistory}
        onPickupTicket={onPickupTicket}
      />
    );
  });

  return (
    <ul>{queueItem}</ul>
  );

};
