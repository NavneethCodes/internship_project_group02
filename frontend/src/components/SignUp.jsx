import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Link} from 'react-router-dom';

const SignUp = () => {
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
      alert("Passwords don't match!");
      setRePass('');
    } else {
      console.log(details);
      axios.post('http://localhost:4000/usernew', details).then((res) => {
          alert('New user registered!');
        })
        .catch((error) => {
          if(error.response){
            alert(error.response.data);
          } else {
            alert('Sign up failed, try again later!');

          }
          console.log(error);
        });
    }
  };

  return (
    <div className='sign_bg'>
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
  );
};

export default SignUp;