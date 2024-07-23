
import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import './LoginForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const [details, setDetails] = useState({
    userContact: '',
    userEmail: '',
    userName: '',
    userPassword: '',
    userStatus: 'active',
  });

  const [rePass, setRePass] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userRePassword') {
      setRePass(value);
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    'userEmail': "",
    'userPassword': ""
  });

  const changelog = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', credentials).then((res) => {
      toast.success(res.data.message);
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error('Login failed');
      }
      console.log(error);
    });
  };

  return (
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
          <button type='submit'>Login</button>
        </div>
        <div className='reg_link'>
          <p>Don't have an account?<Link to='/signup'> Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
