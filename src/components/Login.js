import { React, useState, useEffect } from "react";
import '../../public/styles/login.css';
import axios from "axios";


//Environment variables
const PORT = process.env.API_PORT;
const HOST = process.env.API_HOST;
const BASE_URL = HOST + ":" + PORT;

function isValidEmail(userEmail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
    return true;
  }
  return false;
}

// validate that a user enters the email and pw that matches the db -- unencrypted for now bc of our seed data, fix later
// may want to migrate this to backend in the future 
function loginUser(userEmail, userPassword) {
  const cleanEmail = userEmail.trim(); // consider case sensitivity later -> to lowercase + make SQL query case insensitive possibly
  if (isValidEmail(cleanEmail)) {
    axios.get(`http://${BASE_URL}/api/${cleanEmail}`)
      .then((response) => {
        if (response.rows.length === 0) {
          alert('The user was not found.');
        }
        else if (response.rows.length > 1) { // bad situation, should alert internally that there is a problem
          alert('Internal server error');
        } else {
          // want to validate password here
          if (userPassword === response.rows[0].password) { // TO DO: ENCRYPT
            // set cookie
            // set states needed at the root of the app -> if App needs state variables from successful login
          }
        }
        // either empty array, 1 result, or multip;e results
      })
      .catch((_err) => {
        alert('There is a database error. Please try again!');
      });
  } else {
    alert('Your email is invalid'); // may want to use different method than alert, such as toast notification?
  }
}




export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  // axios.get(`http://${BASE_URL}/api/:user`)

  // query the database for the user object with that email
  //   // axios.get(`http://${BASE_URL}/api/users`;


  //   // if the email doesn't exist, catch the error and return a message


  //   // if email exists, check to see that the password is an exact match at the key value




  return (
    <main>
      <title>SOAR Login</title>

      <div class="login-container">

        <h3>Login</h3>
        <form class="form-inline" onSubmit={e => e.preventDefault()}>
          <div class="form-group mb-2">
            <label for="email">Email:</label>
            <input
              class="form-control"
              name="email" type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="password">Password:</label>
            <input
              class="form-control"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={() => loginUser(email)}
              name="confirm-login"
              class="btn btn-primary">Submit
            </button>
          </div>

        </form>

      </div>

    </main>
  );
};


  // finduserbyEmail
    // finds user id for email
    // array.find()

    // const findUserByEmail = () => {
    //   axios.get(`http://${BASE_URL}/api/users`)
    //     .then(() => {

    //     }
    //     );
    // };

    // function validate() {

    //   // query the database for the user object with that email
    //   // axios.get(`http://${BASE_URL}/api/users`;


    //   // if the email doesn't exist, catch the error and return a message


    //   // if email exists, check to see that the password is an exact match at the key value


      // const findUserbyEmail = (emailadd) => {
  //   axios.get(`${BASE_URL}/api/users`)
  //     .then((data) => {
  //       console.log(data);
  //       data.find((user) => user.email === emailadd);
  //     });
  // };