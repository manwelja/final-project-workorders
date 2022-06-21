import { React, useState, useEffect } from "react";
import './login.css';

// Login component for application. Sets email and password when onChange events occur in the input fields

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = props;

  return (
    <div class="login-form">
      <title>SOAR Login</title>

      <div class="login-container">

        <h1 class="login-header-h1">Login</h1>
        <form class="form-inline" onSubmit={e => e.preventDefault()}>
          <div class="form-group mb-2">
            <label class="login-label" for="email">Email:</label>
            <input
              class="form-control"
              name="email" type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label class="login-label" for="password">Password:</label>
            <input
              class="form-control"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div class="button--inline--container"><button class="button--inline" onClick={(e) => { e.preventDefault(); onLogin(email, password); }}>Submit</button></div>
          </div>

        </form>

      </div>

    </div>
  );
};