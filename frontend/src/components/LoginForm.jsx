import React, { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import './LoginForm.css';
import axios from 'axios';

const LoginForm = () => {

    const [credentials, setCredentials] = useState({
        'userEmail'     : "",
        'userPassword'  : ""
    })

    const changelog = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name] : value });
    }

    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/login', credentials).then((res)=>{
            alert(res.data);
        }).catch((error)=>{
            if(error.response){
                alert(error.response.data);
            } else {
                alert('Login failed');
            }
            console.log(error);
        })
    }  

    return (
        <div className='bg'>
            <form action=''>
                <div>
                    <h1>Login</h1>
                </div>
                <div className='input_box'>
                    <input type='text' placeholder='Email' required name='userEmail' onChange={ changelog }/>
                    <AiOutlineUser className='icon'/>
                </div>
                <div className='input_box'>
                    <input type='password' placeholder='Password' required name='userPassword' onChange={ changelog }/>
                    <IoLockClosedOutline className='icon'/>
                </div>
                <div className='rem_me'>
                <label><input type='checkbox'></input>Remember Me</label>
                <a href='#'>Forgot Password?</a>
                </div>
                <div className='sub_btn'>
                    <button type='submit' onClick={ submit }>Login</button>
                </div>
                <div className='reg_link'>
                    <p>Don't have an account ?<a href='#'> Sign up</a></p>
                </div>
            </form>
        </div>
  )
}

export default LoginForm