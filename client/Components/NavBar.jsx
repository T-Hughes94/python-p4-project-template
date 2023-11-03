import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar({ user, setUser }) {
  const navigate = useNavigate(); // Access the navigate function

  function handleLogout() {
    fetch('/api/logout', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          // Logout successful
          setUser({});
          // Navigate to the root route
          navigate('/');
        }
      });
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Pocket 🔪Chef</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> 
            { Object.values(user).length > 2 ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Nav.Link>
                  <NavLink to="/">Login</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/signup">Sign-Up</NavLink>
                </Nav.Link>
              </>
            )}
            
            <NavDropdown title="Pages" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Home">Home</NavDropdown.Item>
              <NavDropdown.Item href="/Events">Events</NavDropdown.Item>
              <NavDropdown.Item href="/Trucks">Trucks</NavDropdown.Item>
              <NavDropdown.Item href="/EventForm">Event Data</NavDropdown.Item>
              <NavDropdown.Item href="/IncomeChart">Income Chart</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;