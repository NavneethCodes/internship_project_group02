import React from 'react';
import { Link } from 'react-router-dom'
import Eventdetail from './Eventdetail';
import Sidebarr from './Sidebarr'
import './MainEventDisplay.css';
import { Button } from '@mui/material';

const MainEventDisplay = () => {
  return (
    <div className="Event-bg">
      <Sidebarr/>
      <div className="Event-navbar">
      <input type='text' placeholder="search" name="eventName"></input>
        <div className="btn-area">
          <Link to="/login"><Button>login</Button></Link>
        </div>
      </div>
      <div className="Event-display-container">
        <Eventdetail />
      </div>
    </div>
  );
};

export default MainEventDisplay;
