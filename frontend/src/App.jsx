
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import SignUp from './components/SignUp.jsx';
// import Mainpage from './components/Mainpage';
// import LoginForm from './components/LoginForm';
import Sidebarr from './components/Sidebarr';
function App() {
  return (
    <>
       {/* <Routes>
         <Route path='/' element={<Mainpage />} />
         <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUp />} />
       </Routes> */}
       <Sidebarr/>
    </>
  );
}

export default App;

