
import './App.css'
import SignUp from './components/SignUp.jsx'
import Eventdetail from './components/Eventdetail.jsx'

import React from 'react'
import MainBar from './components/MainBar';


const App = () => {
  return (
    <>

           <Eventdetail/> 
           
    {/* <MainBar/> */}
    <SignUp />
    </>
  )
}

export default App