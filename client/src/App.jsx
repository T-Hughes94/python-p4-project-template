import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '/Components/Login';
import Signup from '/Components/Signup';
import Home from '/Components/Home';
import EventForm from '/Components/EventForm';
import Events from '/Components/Events';
import IncomeChart from '/Components/IncomeChart';
import Navbarz from '/Components/Navbarz';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // User state
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);

  // Fetch user data on component mount
  useEffect(() => {
    fetch('/api/check_session')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <BrowserRouter>
      <Navbarz user={user} setUser={setUser} />
      <div>
        <nav className="navbar custom-navbar">
          <Routes className="navbar-routes">
            <Route path="/Login" element={<Login setUser={setUser} />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Home" element={<Home user={user} />} />
            <Route
              path="/EventForm"
              element={<EventForm user={user} setEvents={setEvents} />} 
            />
            <Route path="/Events" element={<Events events={events} />} /> 
            <Route path="/IncomeChart" element={<IncomeChart />} />
          </Routes>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;

