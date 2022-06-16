import { React, useState, useEffect } from "react";
import './login.css';

// validate that a user enters the email and pw that matches the db -- unencrypted for now bc of our seed data, fix later
// may want to migrate this to backend in the future? 
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = props;

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
              onClick={(e) => { e.preventDefault(); onLogin(email, password); }}
              name="confirm-login"
              class="btn btn-primary">Submit
            </button>
          </div>

        </form>

      </div>

    </main>
  );
};