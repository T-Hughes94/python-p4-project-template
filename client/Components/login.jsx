import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if both username and password are filled
    if (!username || !password) {
      setError('Please fill in both username and password fields.');
      return;
    }

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        console.log('Logged in as:', user.name);
        // You can save the user data in local storage if needed.
        // localStorage.setItem('user', JSON.stringify(user));
        navigate('/Home');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h1 className="mb-4">Pocket 🔪Chef</h1>
      <Form className="mt-10"> {/* Added margin to the top of the form */}
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        {error && (
          <p className="error-message text-danger">{error}</p>
        )}

        <div className="text-center">
          <Button
            variant="primary"
            type="button"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>

        <div className="text-center mt-3">
          <Button
            variant="link"
            onClick={() => navigate('/signup')}
          >
            Sign-Up
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
