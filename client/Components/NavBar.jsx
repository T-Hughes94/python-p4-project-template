import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function NavBar({user, setUser}) {
  function handleLogout(){
    fetch('/api/logout', {
      method: 'DELETE', 
    })
    setUser({})
  }  

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Pocket 🔪Chef</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> 
            { Object.values(user).length > 2 ? <button onClick={handleLogout}>Logout</button>: 
            <>
            <Nav.Link ><NavLink to="/">Login</NavLink></Nav.Link>
            <Nav.Link ><NavLink to="/Signup">Sign-Up</NavLink></Nav.Link>
            </>
            }
            
            <NavDropdown title="Pages" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Home">Home</NavDropdown.Item>
              <NavDropdown.Item href="/Events">Event Page</NavDropdown.Item>
              <NavDropdown.Item href="/EventForm">Event Data</NavDropdown.Item>
              <NavDropdown.Item href="/TruckForm">Add Truck</NavDropdown.Item>
              <NavDropdown.Item href="/IncomeChart">Income Chart</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
             </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;