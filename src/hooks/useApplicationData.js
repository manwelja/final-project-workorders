import { useState, useEffect } from "react";
import axios from "axios";

//function responsible for managing all state changes in the application 
export default function useApplicationData() {

  const getQueueListByStatus = function (workorderStatus) {

  }

  const getQueueListByMentor = function (mentorID) {

  }

  const getWorkorderListByStudent = function(studentID) {

  }
  
  const getWorkorderByID = function(workorderID) {

  }
  return { getQueueListByStatus, getQueueListByMentor, getWorkorderListByStudent, getWorkorderByID };
}