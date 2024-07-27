import React from 'react'
import video from '../video/bg-vid.mp4'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="video-background-container">
    <video autoPlay loop muted className="video-background">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <div className="content">
        <h1>look here</h1>
        <p>hiiiiiii</p>
    </div>
</div>
  )
}

export default LandingPage