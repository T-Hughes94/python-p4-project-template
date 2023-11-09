import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_img, setProfileImg] = useState('https://www.shareicon.net/data/2016/09/01/822751_user_512x512.png');
  const navigate = useNavigate();

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
    // Form validation
    if (!name || !password) {
      alert('Please enter a name and password.');
      return;
    }

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
        setUser(data);
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h1 className="mb-4">Sign Up</h1>
      <Form className="mt-4">
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            aria-label="Name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            aria-label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            aria-label="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Image URL"
            aria-label="Image URL"
            name="profile_img"
            value={profile_img}
            onChange={handleInputChange}
          />
        </InputGroup>

        <div className="text-center">
          <Button
            variant="primary"
            type="button"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Signup;
