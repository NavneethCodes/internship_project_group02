import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile.jsx';
import SignUp from './components/SignUp.jsx';
import LoginForm from './components/LoginForm.jsx';
import MainEventDisplay from './components/MainEventDisplay.jsx';
import About from './pages/About.jsx';
import Sidebarr from './components/Sidebarr.jsx';
import LandingPage from './components/LandingPage.jsx';
import EventComments from './components/EventComments';
import Adminevent from './components/Adminevent.jsx';
 // Import EventComments

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainEventDisplay/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/maineventdetails' element={<MainEventDisplay/>}></Route>
        <Route path='/home' element={<About/>}></Route>
        <Route path='/comments/:eventId' element={<EventComments/>}></Route>
        <Route path='/adminevent' element={<Adminevent/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route> {/* New route for comments */}
        {/* Add more routes here if needed */}
      </Routes>

      
    </>
  );
}

export default App;
