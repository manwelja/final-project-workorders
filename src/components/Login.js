import { React, useState, useEffect } from "react";
import './login.css';
import axios from "axios";
import { useCookies } from "react-cookie";

//Environment variables
const PORT = process.env.REACT_APP_API_PORT;
const HOST = process.env.REACT_APP_API_HOST;
const BASE_URL = HOST + ":" + PORT;

function isValidEmail(userEmail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
    return true;
  }
  return false;
}
// validate that a user enters the email and pw that matches the db -- unencrypted for now bc of our seed data, fix later
// may want to migrate this to backend in the future? 
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies([""]);

  const { onSuccessStudent, onSuccessMentor } = props;


  function loginUser(userEmail, userPassword, onSuccessStudent, onSuccessMentor) {

    const cleanEmail = userEmail.trim();
    if (isValidEmail(cleanEmail)) {
      axios.get(`http://${BASE_URL}/api/login/${cleanEmail}`)
        .then((response) => {
          if (response.data.length === 0) {
            alert('The user was not found.');
          }
          else if (response.data.length > 1) {
            alert('Internal server error');
          } else {
            // validate password here
            if (userPassword === response.data[0].password) { // TO DO: ENCRYPT
              //console.log('have password to set cookie');
              // set cookie --> save it in state...?
              setCookie("user", userEmail, { path: "/" });
              response.data[0].role.trim() === "mentor" ? onSuccessMentor() : onSuccessStudent();
            }
          }
        })
        .catch((err) => {
          alert(`There is a database error. Please try again!`);
        });
    } else { // if email is not valid (e.g. it doesn't have an @ sign or is code, etc)
      alert('Your email is invalid'); // may want to use different method than alert, such as toast notification
    }
  }
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
              onClick={() => loginUser(email, password, onSuccessStudent, onSuccessMentor)}
              name="confirm-login"
              class="btn btn-primary">Submit
            </button>
          </div>

        </form>

      </div>

    </main>
  );
};