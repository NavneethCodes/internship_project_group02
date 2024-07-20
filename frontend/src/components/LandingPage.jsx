import React from 'react'
import './LandingPage.css'
import FlexExpand from './FlexExpand'

const LandingPage = () => {
  return (
    <div className="land_bg">
        <div className="top_bar">
          <div className="event_txt">
              <span className="head_txt">Event Manager</span>
                    <button class="btn-31">
                      <span class="text-container">
                       <span class="text">Button</span>
                     </span>
                    </button>
                    <button class="btn-32">
                      <span class="text-container">
                       <span class="text">Button2</span>
                     </span>
                    </button>
                    <button class="btn-32">
                      <span class="text-container">
                       <span class="text">Button3</span>
                     </span>
                    </button>
                    <button class="btn-32">
                      <span class="text-container">
                       <span class="text">Button4</span>
                     </span>
                    </button>

            </div>
        </div>
        <div className="flex-expand">
          <FlexExpand/>
        </div>
    </div>
  )
}

export default LandingPage