
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Sign_up from './components/Sign_up.jsx';
import Mainpage from './components/Mainpage';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<Sign_up />} />
      </Routes>
    </>
  );
}

export default App;

