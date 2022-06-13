import { React, useState, useEffect } from "react";
import '../../public/styles/login.css';
import axios from "axios";


//Environment variables
// const PORT = process.env.API_PORT;
// const HOST = process.env.API_HOST;
// const BASE_URL = HOST + ":" + PORT;
// route: /login

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //onchange 

  const BASE_URL = 'http://localhost:8001';

  // function validateLogin () {
  // const user = findUserByEmail(request.body.email, users);

  // query the database for the user object with that email
  // axios.get(`http://${BASE_URL}/api/users`;
  // if the email doesn't exist, catch the error and return a message
  // if email exists, check to see that the password is an exact match at the key value
  // search the users array of objects, and look within the object key.

  const findUserbyEmail = (emailadd) => {
    axios.get(`${BASE_URL}/api/users`)
      .then((data) => {
        console.log(data);
        data.find((user) => user.email === emailadd);
      });
  };

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
              onClick={() => validate()}
              name="confirm-login"
              class="btn btn-primary">Submit
            </button>
            <button
              onClick={() => findUserbyEmail('janedoe@gmail.com')}>TryLogin
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