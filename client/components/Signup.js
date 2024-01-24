import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const Signup = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginusername, setloginUserName] = useState('');
  const [loginpassword, setloginPassword] = useState('');

  const sendToDataBase = async () => {
    try {
      let response = await fetch(`http://localhost:4000/logup/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        // body: JSON.stringify({ username }),
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        let responseGiven = response.json();
        console.log(`server response: ${responseGiven}`);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const checkDataBase = async () => {
    try {
      let response = await fetch(`http://localhost:4000/logup/login`, {
      method: 'POST',  
      headers: {
          'Content-type': 'application/json',
        },
        // body: JSON.stringify({ username }),
        body: JSON.stringify({ loginusername, loginpassword }),
      });

      if (response.ok) {
        let responseGiven = response.json();
        console.log(`server response: ${responseGiven}`);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('enter handle submit');
    sendToDataBase();
    console.log('sent');
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    console.log('enter handle submit login');
    checkDataBase();
    console.log('sent');
  };

  return (
    <div>
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <label for='signUpUserName'>Username:</label>
          <input
            type='text'
            id='signUpUserName'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label for='signUpPassword'>Password:</label>
          <input
            type='text'
            id='signUpPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        <h3>Login</h3>
        <form onSubmit={handleSubmitLogin}>
          <label for='loginUserName'>Username:</label>
          <input
            type='text'
            id='loginUserName'
            value={loginusername}
            onChange={(e) => setloginUserName(e.target.value)}
          />
          <label for='loginPassword'>Password:</label>
          <input
            type='text'
            id='loginPassword'
            value={loginpassword}
            onChange={(e) => setloginPassword(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
