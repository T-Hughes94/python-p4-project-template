import { useEffect, useState } from 'react';
import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from "/Components/Login";
import Signup from "/Components/Signup";
import Home from "/Components/Home";
import EventForm from "/Components/EventForm";
import Events from "/Components/Events";
import IncomeChart from "/Components/IncomeChart";
import Navbarz from "/Components/Navbarz";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [user, setUser] = useState({})
  useEffect(()=>{
    fetch('/api/check_session')
    .then(r => r.json())
    .then(data => setUser(data))
  },[])

  return (
    <BrowserRouter>
    <Navbarz user={user} setUser={setUser}/>
    <div>
      <nav className="navbar custom-navbar">
      <Routes className="navbar-routes">
          <Route path='/Login' element={<Login setUser={setUser} />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Home' element={<Home user={user} />} />
          <Route path='/EventForm' element={<EventForm />} />
          <Route path='/Events' element={<Events />} />
          <Route path='/IncomeChart' element={<IncomeChart />} />
       </Routes>
      </nav>
    </div>
  </BrowserRouter>
  )
}

export default App
