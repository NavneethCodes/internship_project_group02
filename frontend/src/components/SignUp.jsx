import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
    if (!termsAccepted) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }
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
          sessionStorage.setItem('userPassword', res.data.savedUser.userPassword);
          navigate('/login');
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

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTerms(true);
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
  };

  const handleAgree = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const handleDisagree = () => {
    setTermsAccepted(false);
    setShowTerms(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
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
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              required
              value={details.userPassword}
              onChange={handleChange}
            />
            {showPassword ? (
              <AiOutlineEye className='icon eye-icon' onClick={togglePasswordVisibility} />
              
            ) : (
              <AiOutlineEyeInvisible className='icon eye-icon' onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className='input_box'>
            <input
              name='userRePassword'
              type={showRePassword ? 'text' : 'password'}
              placeholder='Re-enter Password'
              required
              value={rePass}
              onChange={handleChange}
            />
            {showRePassword ? (
              <AiOutlineEye className='icon eye-icon' onClick={toggleRePasswordVisibility} />
              
            ) : (
              <AiOutlineEyeInvisible className='icon eye-icon' onClick={toggleRePasswordVisibility} />
            )}
          </div>
          <div className='terms'>
            <label>
              <input 
                type='checkbox' 
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              /> 
              By signing up you accept the{' '}
              <a href='#' onClick={handleTermsClick}>Terms of Service and Privacy Policy</a>
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

      {showTerms && (
        <div className="terms-popup">
          <div className="terms-content">
            <div className="terms-header">
              <h3>Terms of Service and Privacy Policy</h3>
              <button className="close-button" onClick={handleCloseTerms}>&times;</button>
            </div>
            <div className="terms-body">
              <h4>Terms and Conditions</h4>
              {/* Include your terms and conditions content here */}
            </div>
            <div className="terms-footer">
              <button onClick={handleAgree}>I Agree</button>
              <button onClick={handleDisagree}>I Disagree</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
