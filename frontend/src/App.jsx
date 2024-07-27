import './App.css'
import React from 'react'
import Profile from './components/Profile'
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.jsx'
import LoginForm from './components/LoginForm.jsx';
import MainEventDisplay from './components/MainEventDisplay.jsx';
import About from './pages/About.jsx'
import Sidebarr from './components/Sidebarr.jsx'
import LandingPage from './components/LandingPage.jsx'



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainEventDisplay/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/maineventdetails' element={<MainEventDisplay/>}></Route>
        <Route path='/home' element={<About/>}></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>

      
    </>
  );
}

export default App; 