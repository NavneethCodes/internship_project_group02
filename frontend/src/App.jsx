import React from 'react';
import Mainpage from './components/Mainpage';
import SignUp from './components/SignUp';
import LoginForm from './components/LoginForm';
import{Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <div className="App">
      <Mainpage/>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;


