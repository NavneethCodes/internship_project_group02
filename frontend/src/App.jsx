import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import SignUp from './components/SignUp.jsx';
import LoginForm from './components/LoginForm.jsx';
import MainEventDisplay from './components/MainEventDisplay.jsx';
import About from './pages/About.jsx';
import Sidebarr from './components/Sidebarr.jsx';
import LandingPage from './components/LandingPage.jsx';
import EventComments from './components/EventComments'; // Import EventComments
import HomePage from './components/HomePage.jsx';
import UserProfile from './components/UserProfile.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Dummy from './components/Dummy.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/maineventdetails' element={<MainEventDisplay/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/profile' element={<UserProfile/>}></Route>
        <Route path='/dashboard' element={<AdminDashboard/>}></Route>
        
        <Route path='/comments/:eventId' element={<EventComments/>}></Route> {/* New route for comments */}
        {/* Add more routes here if needed */}
      </Routes>

      
    </>
  );
}

export default App;
