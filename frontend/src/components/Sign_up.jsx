import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import '../styles/Sign_up.css'

const Sign_up = () => {
  return (
    <div className='bg'>
            <form action=''>
                <div>
                    <h1>Sign Up</h1>
                </div>
                <div className='input_box'>
                    <input type='text' placeholder='Username' required/>
                    <AiOutlineUser className='icon'/>
                </div>
                <div className='input_box'>
                    <input type='text' placeholder='Email' required/>
                    < MdOutlineEmail className='icon'/>
                </div>
                <div className='input_box'>
                    <input type='password' placeholder='Password' required/>
                    <IoLockClosedOutline className='icon'/>
                </div>
                <div className='input_box'>
                    <input type='password' placeholder='Re-Enter Password' required/>
                    <IoLockClosedOutline className='icon'/>
                    </div>
                    <div className='terms'>
  <label>
    <input type='checkbox' required /> 
    By signing up, you accept the 
    <a href='#' className='terms-link'>Terms of Service</a> and 
    <a href='#' className='privacy-link'>Privacy Policy</a>
  </label>
</div>

                <div className='sub_btn'>
                    <button type='submit'>Sign Up</button>
                </div>
                <div className='reg_link'>
                    <p>Already have an account ?<a href='#'> Sign in</a></p>
                </div>
            </form>
    </div>
  )
}

export default Sign_up