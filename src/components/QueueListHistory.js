import React from "react";
import QueueListItemHistory from "./QueueListItemHistory";

//Component that invokes a QueueListItem child for each workorder in the data set
export default function QueueList(props) {
  const { onView, onHistory, workorders, onPickupTicket } = props;

  const queueItem = workorders.map((workOrderData, idx) => {
    //return a populated Queuelist item for each workorder in the data set
    return (
      <QueueListItemHistory class="queue-container"
        key={workOrderData.id}
        workorderID={workOrderData.id}
        numInQueue={idx + 1}
        environment={workOrderData.environment}
        description={workOrderData.description}
        date_created={workOrderData.date_created}
        date_closed={workOrderData.date_closed}
        student_first_name={workOrderData.student_first_name}
        student_last_name={workOrderData.student_last_name}
        topic={workOrderData.topic}
        category={workOrderData.category}
        screenshot_url={workOrderData.screenshot_url}
        status_id={workOrderData.status_id}
        workorder_id={workOrderData.id}
        student_id={workOrderData.user_student_id}
        onView={onView}
        onHistory={onHistory}
        onPickupTicket={onPickupTicket}
      />
    );
  });

  return (
    <ul class="queue-container">{queueItem}</ul>
  );

};
