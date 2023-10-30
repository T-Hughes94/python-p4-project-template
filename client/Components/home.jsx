import React, { useEffect, useState } from 'react';
import Events from "./Events"; // Corrected import path
import EventForm from "./EventForm"; // Corrected import path
import IncomeChart from "./IncomeChart"; // Corrected import path
import { NavLink } from 'react-router-dom';

function Home({user}) {

  console.log(user)
  return (
    <div>
      {user ? (
        <div className="user-profile">
          <img src={user.profile_img} alt="Profile" />
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
      ) : (
        <p>User not logged in</p>
      )}
      <nav>
        <ul>
          <li>
          <NavLink to="/Events">Events</NavLink>
          </li>
          <li>
          <NavLink to="/EventForm">Add Events</NavLink>
          </li>
          <li>
          <NavLink to="/IncomeChart">Income Chart</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;

