import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    console.log('enter handle submit');
    sendToDataBase();
    console.log('sent');
  };

  const sendToDataBase = async () => {
    try {
      await fetch(`http://localhost:4000/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`server response: ${data}`);
          // setUserName(data)
        });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <label for='signUpUserName'>Username:</label>
        <input
          type='text'
          id='signUpUserName'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
      <form onSubmit={handleSubmit}>
        <label for='signUpPassword'>Password:</label>
        <input
          type='text'
          id='signUpPassword'
          value={userName}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <Link to='https://weather.com' style={{ color: 'white' }}>
        Weather
      </Link>
    </div>
  );
};

export default Signup;
