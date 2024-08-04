import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile.jsx';
import SignUp from './components/SignUp.jsx';
import LoginForm from './components/LoginForm.jsx';
import MainEventDisplay from './components/MainEventDisplay.jsx';
import HomePage from './components/HomePage.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import EventComments from './components/EventComments';
import UserProfile from './components/UserProfile.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Team from './components/Team.jsx';

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const user_id = sessionStorage(`user_id`);
      sessionStorage.removeItem(`user_id`);
      sessionStorage.removeItem(`user_name`);
      if (user_id) {
        navigator.sendBeacon(`/logout/${user_id}`);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/maineventdetails' element={<MainEventDisplay/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/comments/:eventId' element={<EventComments/>}></Route>
        <Route path='/events' element={<MainEventDisplay/>}></Route>
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
