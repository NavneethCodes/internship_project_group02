import './App.css'
import React from 'react'
import {Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'

const App = () => {
  return (
    <>
      <Routes>
              <Route path='/login' element={<LoginForm/>}></Route>
              <Route path='/signup' element={<SignUp/>}></Route>

      </Routes>
    </>
  )
}

export default App