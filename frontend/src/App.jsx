import './App.css'
import React from 'react'
import MainBar from './components/MainBar';
import Profile from './components/Profile'
import Eventdetail from './components/Eventdetail'
import LoginForm from './components/LoginForm'

import { Routes, Route } from 'react-router-dom';
import Sidebarr from './components/Sidebarr'; 

function App() {
  return (
    <>
       {/* <Sidebarr/>  */}
       
    <Profile/>
    </>
  );
}

export default App; 