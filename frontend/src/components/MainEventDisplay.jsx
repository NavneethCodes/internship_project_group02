import React from 'react';
import Eventdetail from './Eventdetail';
import './MainEventDisplay.css';
import { Button } from '@mui/material';

const MainEventDisplay = () => {
  return (
    <div className="Event-bg">
      <div className="Event-navbar">
      <input type='text' placeholder="search" name="eventName"></input>
        <div className="btn-area">
          <Button>login</Button>
        </div>
      </div>
      <div className="Event-display-container">
        <Eventdetail />
      </div>
    </div>
  );
};

export default MainEventDisplay;
