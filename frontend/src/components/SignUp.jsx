
import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    userContact: '',
    userEmail: '',
    userName: '',
    userPassword: '',
    userStatus: 'active',
  });

  const [rePass, setRePass] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userRePassword') {
      setRePass(value);
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.userPassword !== rePass) {
      toast.error("Passwords don't match!");
      setRePass('');
    } else {
      console.log(details);
      axios.post('http://localhost:4000/usernew', details)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          sessionStorage.setItem('user_id', res.data.savedUser._id);
          sessionStorage.setItem('userName', res.data.savedUser.userName);
          navigate('/maineventdetails');
        })
        .catch((error) => {
          if (error.response) {
            toast.error(`Error: ${error.response.data}`);
          } else {
            toast.error('Sign up failed, try again later!');
          }
        });
    }
  };

  return (
    <div className='sign-main-bg'>
    <div className='sign_bg'>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Sign Up</h2>
        </div>
        <div className='input_box'>
          <input
            name='userName'
            type='text'
            placeholder='Full name'
            required
            value={details.userName}
            onChange={handleChange}
          />
        </div>
        <div className='input_box'>
          <input
            name='userEmail'
            type='text'
            placeholder='Email'
            required
            value={details.userEmail}
            onChange={handleChange}
          />
        </div>
        <div className='input_box'>
          <input
            name='userContact'
            type='text'
            placeholder='Contact'
            required
            value={details.userContact}
            onChange={handleChange}
          />
        </div>
        <div className='input_box'>
          <input
            name='userPassword'
            type='password'
            placeholder='Password'
            required
            value={details.userPassword}
            onChange={handleChange}
          />
        </div>
        <div className='input_box'>
          <input
            name='userRePassword'
            type='password'
            placeholder='Re-enter Password'
            required
            value={rePass}
            onChange={handleChange}
          />
        </div>
        <div className='terms'>
          <label>
            <input type='checkbox' /> By signing up you accept the{' '}
            <a href='#'>Terms of Service and Privacy Policy</a>
          </label>
        </div>
        <div className='sign_btn'>
          <button type='submit'>Sign Up</button>
        </div>
        <div className='already_acc'>
          <label>
            Already have an account? <Link to='/login'>Sign In</Link>
          </label>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
