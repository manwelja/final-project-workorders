## Product Overview

Summary: An assistance ticket app made for the use case of a coding bootcamp in which students request help from mentors. 

SOAR or (Student Online Assistance Request) is a help ticket web application created to help connect web development bootcamp students with mentor assistance. Students can create a help ticket and receive assistance from a mentor who has expertise in the area their issue pertains to. Mentors can view all help request tickets and pick up specific tickets that they are equipped to assist with. 

## Technologies

This application was created with Create React App. A complete list of the technologies used to build this application can be seen below:

  ### Client Side:
  -  React
  -  Web Sockets
  -  Cloudinary API

  ### Server-Side:
  -  PostgreSQL
  -  Express.js

  ### Testing:
  -  Storybook


## Final Product - Screenshots

!["Login Screen"](https://github.com/manwelja/final-project-workorders/blob/main/docs/login_screen.png)
!["Mentor Queue"](https://github.com/manwelja/final-project-workorders/blob/main/docs/mentor_queue.png)
!["Student Workorders"](https://github.com/manwelja/final-project-workorders/blob/main/docs/student_view.png)
!["New Workorder"](https://github.com/manwelja/final-project-workorders/blob/main/docs/workorder_new.png)
!["View Workorder"](https://github.com/manwelja/final-project-workorders/blob/main/docs/workorder_view.png)
!["Meeting Link"](https://github.com/manwelja/final-project-workorders/blob/main/docs/meeting_link.png)
!["Feedback"](https://github.com/manwelja/final-project-workorders/blob/main/docs/feedback_view.png)

## SECTION - Using The Application

  ### Student 
  -  Login to the application and go to the top navigation bar. Click on the “My Workorders” button to view all help tickets you created. You can view each workorder’s status at the top section of the box.
  -  Click the “New Workorder” button at the top navigation bar to create a new workorder. Enter the relevant information for the assistance requests in the fields, such as computer environment, language and framework, and upload a screenshot. 

  ### Mentor
-  Login to the application and go to the top navigation bar. Click on the “My Workorders” button to view all of your workorders. 
-  On each individual ticket, you can view the student’s request history by clicking “View History” or view more information about the student’s issue by clicking “View”. 
-  Once the ticket information is open for display, you can click the “Pick Up” button at the bottom right. This automatically changes the workorder’s status to “in progress”. 
-  You can then choose to add a video meeting link URL. Clicking “send” will add that link to the workorder information that the student sees. 
-  Once the workorder has been resolved, you can click “Close” at the bottom right to close out the workorder.


## Authors
  -  Emma Grannis (https://github.com/egrannis)
  -  Aaron Au (https://github.com/chunloy)
  -  Jennifer Manwell (https://github.com/manwelja)


## Project Setup Instructions

### Workorder System API
  1.  Clone the final-project-workorders-api (https://github.com/manwelja/final-project-workorders-api) repo. 
  2.  Follow the setup instructions in the API README. 
  3.  Run the API server as per the instructions in the final-project-workorders-api README. 

### Workorder System
  1. Create a new repository using this repository as a template.
  2. Clone your repository onto your local device.
  3. Install dependencies using the npm install command.
  4. Create an .env file and complete it with the database and Cloudinary API connection information (see .env.example)
  4. Start the API web server (https://github.com/manwelja/final-project-workorders-api)
  5. Start the application using the npm start local command. The app will be served at http://localhost:8000/.
  6. Go to http://localhost:8000 in your browser.


## Dependencies
  -  Axios 0.27.2 or above
  -  websocket 1.0.34 or above
  -  @cloudinary/react 1.4.1
  -  @cloudinary/url-gen 1.8.0 or above
  -  @fortawesome/free-regular-svg-icons 6.1.1 or above
  -  @testing-library/jest-dom 5.16.4 or above
  -  @testing-library/react 13.3.0 or above
  -  @testing-library/user-event 13.5.0 or above
  -  bootstrap 5.1.3 or above
  -  classnames 2.3.1 or above
  -  cloudinary 1.30.0 or above
  -  cloudinary-core 2.12.3 or above
  -  fns 1.0.0 or above
  -  fs 
  -  react 18.1.0 or above
  -  react-bootstrap 2.4.0 or above
  -  react-cookie 4.1.1 or above
  -  react-dom 18.1.0 or above
  -  react-scripts": "5.0.1 or above
  -  react-select 5.3.2 or above
  -  react-simple-star-rating 4.0.5 or above
  -  react-stars 2.2.5 or above
  -  reactstrap 9.1.1 or above
  -  web-vitals 2.1.4 or above
