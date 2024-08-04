import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import './LoginForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link }  from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  console.log('LoginForm component rendered');
  const navigate = useNavigate(); 
  const [credentials, setCredentials] = useState({
    'userEmail': "",
    'userPassword': ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);


  const changelog = (e) => {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log('Submit function called');
    if (credentials.userEmail === 'admin123' && credentials.userPassword === 'admin123') {
      sessionStorage.setItem('user_id', "Admin");
      sessionStorage.setItem('userName', "Admin");
      sessionStorage.setItem('userPassword', "Admin");
      navigate('/admindashboard');
      return;
    }
    axios.post('http://localhost:4000/login', credentials)
     .then((res) => {
        if(res.data.user.userStatus === 'suspend'){
          toast.error("Admin blocked your access! If you think this is a mistake, contact admin or try again later!");
        } else {
          toast.success(res.data.message);
          sessionStorage.setItem('user_id', res.data.user._id);
          sessionStorage.setItem('userName', res.data.user.userName);
          sessionStorage.setItem('userPassword', res.data.user.userPassword);
          navigate('/maineventdetails');
        }
      })
     .catch((error) => {
        console.log('Login error:', error);
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error('Login failed');
        }
      });
  };

  const handleButtonClick = (e) => {
    submit(e);
  };

  const sendForgotPasswordRequest = () => {
    axios.get(`http://localhost:4000/forgot-password/${credentials.userEmail}`)
      .then((res) => {
        setForgotPasswordSent(true);
        toast.success('Password is sent to your registered email id.');
      })
      .catch((error) => {
        console.log('Forgot password error:', error);
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error('Forgot password request failed');
        }
      });
  };


  const goToForgot = (e) => {
    e.preventDefault();
    sendForgotPasswordRequest();
  };

  const resendForgotPasswordRequest = (e) => {
    e.preventDefault();
    sendForgotPasswordRequest();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder='Password' 
              required 
              name='userPassword' 
              onChange={changelog} 
            />
            <IoLockClosedOutline className='login-icon' />
            {showPassword ? (
              <AiOutlineEye className='icon eye-icon' onClick={togglePasswordVisibility} />
              
            ) : (
              <AiOutlineEyeInvisible className='icon eye-icon' onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className='rem_me'>
            <label><input type='checkbox' />Remember Me</label>
            <a onClick={goToForgot}>Forgot Password?</a>
          </div>
          {forgotPasswordSent && (
            <div className='forgot-password-message'>
              <p>If you don't receive the password, <a href='#' onClick={resendForgotPasswordRequest}>click here</a>.</p>
            </div>
          )}
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
