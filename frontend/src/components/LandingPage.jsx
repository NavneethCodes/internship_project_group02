import React from 'react';
import './LandingPage.css';
import FlexExpand from './FlexExpand';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className="land_bg">
      <div className="top_bar">
        <div className="event_txt">
          <span className="head_txt">Event Manager</span>
          <button className="btn-31" onClick={handleButtonClick}>
            <span className="text-container">
              <span className="text">Login</span>
            </span>
          </button>
          {/* Uncomment if needed
          <button className="btn-32">
            <span className="text-container">
              <span className="text">Button2</span>
            </span>
          </button>
          <button className="btn-32">
            <span className="text-container">
              <span className="text">Button3</span>
            </span>
          </button>
          <button className="btn-32">
            <span className="text-container">
              <span className="text">Button4</span>
            </span>
          </button>
          */}
        </div>
      </div>
      <div className="flex-expand">
        <FlexExpand />
      </div>
    </div>
  );
};

export default LandingPage;
