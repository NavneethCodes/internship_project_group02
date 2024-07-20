import React from 'react'
import './LandingPage.css'

const Button = ({ label, className }) => {
  return (
      <button className={`button ${className} raised`}>
          {label}
      </button>
  );
};

const LandingPage = () => {
  return (
    <div className="land_bg">
        <div className="top_bar">
          <div className="event_txt">
            <h>Event Manager</h>
                    <Button label="Warning" className="warning" />
                    <Button label="Help" className="help" />
                    <Button label="Danger" className="danger" />
                    <Button label="Plain" className="plain" />

            </div>
        </div>
        
        
        
    </div>
  )
}

export default LandingPage