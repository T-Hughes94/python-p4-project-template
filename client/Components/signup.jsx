import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ history, setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_img, setProfileImg] = useState('https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg');

  const navigate = useNavigate()
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'profile_img') {
      setProfileImg(value);
    }
  };

  const handleSignup = () => {
    // form validation
    if (!name || !password) {
      alert('Please enter a name and password.');
      return;
    }
    console.log(JSON.stringify({ name, profile_img, email, password }));
    // POST request for a new user account
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, profile_img, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // Handle a successful signup, redirect to the login page
          setUser(data)
          navigate('/home')
        } else {
          // Handle a signup error
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle network or other errors
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div id="signup">
      <h1 id="signup-title">Sign Up:</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="profile_img">Image URL:</label>
          <input
            type="text"
            id="profile_img"
            name="profile_img"
            value={profile_img}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;