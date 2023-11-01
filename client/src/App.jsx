import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '/Components/Login';
import Signup from '/Components/Signup';
import Home from '/Components/Home';
import TruckForm from '/Components/TruckForm';
import EventForm from '/Components/EventForm';
import Events from '/Components/Events';
import IncomeChart from '/Components/IncomeChart';
import NavBar from '/Components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // User state
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [trucks, setTrucks] = useState([]);

  // Fetch user data on component mount
  useEffect(() => {
    fetch('/api/check_session')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  console.log(user)

  
  return (
    <BrowserRouter>
    {user.food_truck ?
    <div>
      <NavBar user={user} setUser={setUser} />
      <div>
        <nav className="navbar custom-navbar">
          <Routes className="navbar-routes">
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/EventForm" element={<EventForm user={user} setEvents={setEvents} setTrucks={setTrucks} />} />
            <Route path="/TruckForm" element={<TruckForm user={user} setTrucks={setTrucks} />} />
            <Route path="/Events" element={<Events events={events} trucks={trucks} />} /> 
            <Route path="/IncomeChart" element={<IncomeChart />} />
          </Routes>
        </nav>
      </div>
      </div>
      : 
      <div>
          <nav className="navbar custom-navbar">
          <Routes className="navbar-routes">
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/Signup" element={<Signup setUser={setUser}/>} />
            <Route path="/home" element={<TruckForm user={user} setTrucks={setTrucks} />} />
          </Routes>
        </nav>
      </div>
      }
    </BrowserRouter>
  );
}

export default App;

