import './App.css'
import React from 'react'

import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm'

function App() {
  return (
    <>
       {/* <Sidebarr/>  */}
       
    <Profile/>
       <LoginForm/> 
    </>
  );
}

export default App; 