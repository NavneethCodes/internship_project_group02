import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link }  from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  console.log('LoginForm component rendered'); // Add this line
  const navigate = useNavigate(); 
  const [credentials, setCredentials] = useState({
    'userEmail': "",
    'userPassword': ""
  });

  const changelog = (e) => {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log('Submit function called'); // Add this line
    axios.post('http://localhost:4000/login', credentials)
     .then((res) => {
        console.log('Login successful:', res.data); // Add this line
        toast.success(res.data.message);
        localStorage.setItem('sessionToken', res.data.sessionToken);
        navigate('/maineventdetails');
      })
     .catch((error) => {
        console.log('Login error:', error); // Add this line
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error('Login failed');
        }
      });
  };

  const handleButtonClick = () => {
    submit();
  };

  return (
    <div className='login-main-bg'>
      <div className='bg'>
        <ToastContainer />
        <form onSubmit={submit}>
          <div>
            <h1>Login</h1>
          </div>
          <div className='input_box'>
            <input type='text' placeholder='Email' required name='userEmail' onChange={changelog} />
            <AiOutlineUser className='icon' />
          </div>
          <div className='input_box'>
            <input type='password' placeholder='Password' required name='userPassword' onChange={changelog} />
            <IoLockClosedOutline className='icon' />
          </div>
          <div className='rem_me'>
            <label><input type='checkbox' />Remember Me</label>
            <a href='#'>Forgot Password?</a>
          </div>
          <div className='sub_btn'>
            <button type='submit' onClick={handleButtonClick}>Login</button>
          </div>
          <div className='reg_link'>
            <p>Don't have an account?<Link to='/signup'> Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm; 