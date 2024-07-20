import './App.css'
import React from 'react'
import {Routes, Route } from 'react-router-dom';
import MainBar from './components/MainBar.jsx'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import LandingPage from './components/LandingPage.jsx';
import FlexExpand from './components/FlexExpand.jsx'


const App = () => {
  return (
    <>
      <Routes> 
              <Route path='/' element={<LandingPage/>}></Route>
              <Route path='/mainbar' element={<MainBar/>}></Route>
              <Route path='/login' element={<LoginForm/>}></Route>
              <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </>
  )
}

export default App