import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile.jsx';
import SignUp from './components/SignUp.jsx';
import LoginForm from './components/LoginForm.jsx';
import MainEventDisplay from './components/MainEventDisplay.jsx';
import HomePage from './components/HomePage.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import EventComments from './components/EventComments';
import AdminEvent from './components/AdminEvent.jsx'
import UserProfile from './components/UserProfile.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Team from './components/Team.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/maineventdetails' element={<MainEventDisplay/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/dashboard' element={<AdminDashboard/>}></Route>
        <Route path='/comments/:eventId' element={<EventComments/>}></Route>
        <Route path='/events' element={<AdminEvent/>}></Route>
        <Route path='/profile' element={<UserProfile/>}></Route>
        <Route path='/about' element={<About/>}></Route>  
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/team' element={<Team/>}></Route>  
        {/* New route for comments */}
        {/* Add more routes here if needed */}
        
      </Routes>
      
      
    </>
  );
}

export default App;
