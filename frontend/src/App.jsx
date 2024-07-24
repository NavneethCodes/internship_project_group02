
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.jsx'
import LoginForm from './components/LoginForm.jsx';
import MainEventDisplay from './components/MainEventDisplay.jsx';
import About from './pages/About.jsx'
import Sidebarr from './components/Sidebarr.jsx'



function App() {
  return (
    <>
    <Sidebarr/>
      <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
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