import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import './LoginForm.css'

const LoginForm = () => {
  return (
    <div className='bg'>
            <form action=''>
                <div>
                    <h1>Login</h1>
                </div>
                <div className='input_box'>
                    <input type='text' placeholder='Username' required/>
                    <AiOutlineUser className='icon'/>
                </div>
                <div className='input_box'>
                    <input type='password' placeholder='Password' required/>
                    <IoLockClosedOutline className='icon'/>
                </div>
                <div className='rem_me'>
                <label><input type='checkbox'></input>Remember Me</label>
                <a href='#'>Forgot Password?</a>
                </div>
                <div className='sub_btn'>
                    <button type='submit'>Login</button>
                </div>
                <div className='reg_link'>
                    <p>Don't have an account ?<a href='#'> Sign up</a></p>
                </div>
            </form>
    </div>
  )
}

export default LoginForm