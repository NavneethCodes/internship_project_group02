import React from 'react'
import './SignUp.css'

const SignUp = () => {
  return (
    <div className='sign_bg'>
      <form action=''>
         <div>
            <h2>Sign Up</h2>
        </div>
        <div className="input_box">
          <input type='text' placeholder='Full name' required ></input>
        </div>
        <div className="input_box">
          <input type='text' placeholder='Email' required ></input>
        </div>
        <div className="input_box">
          <input type='text' placeholder='Contact' required ></input>
        </div>
        <div className="input_box">
          <input type='password' placeholder='Password' required ></input>
        </div>
        <div className="input_box">
          <input type='password' placeholder='Re-Enter Password' required ></input>
        </div>
        <div className='terms'>
          <label><input type='checkbox'/> By signing up you accept the <a href='#'>Terms of service and Privacy Policy</a></label>
        </div>
        <div className='sign_btn'>
            <button>
              Sign Up
            </button>
        </div>
        <div className='already_acc'>
          <label>Already have an account ?<a href='#'> Sign In</a></label>
        </div>

      </form>
    </div>
      
  )
}

export default SignUp