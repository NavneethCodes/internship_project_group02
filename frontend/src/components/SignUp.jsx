import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';

const SignUp = () => {
  const [details, setDetails] = useState({
    "userContact":"",
    "userEmail":"",
    "userName":"",
    "userPassword":"",
    "userStatus":"active"
  })

  const [rePass, setrePass] = useState("");
  var location = useLocation();
  var navigate = useNavigate()

  let Change = (e) =>{
    let {name, value} = e.target;
    if (name === 'userRePassword'){
      setrePass(value);
    } else {
      setDetails({...details, [name]:value});
    }
  }

  let submitter = (e) =>{
    e.preventDefault();
    if(details.userPassword !== rePass){
      alert("Password doesn't match!");
      setrePass("");
    } else {
      console.log(details);
      axios.post('http://localhost:4000/usernew', details).then((res)=>{
        alert("New user entered!");
      }).catch((error)=>{
        console.log(error);
      })
    }
  
  }

  return (
    <div className='sign_bg'>
      <form action=''>
         <div>
            <h2>Sign Up</h2>
        </div>
        <div className="input_box">
          <input name='userName' type='text' placeholder='Full name' required value={details.userName} onChange={Change}></input>
        </div>
        <div className="input_box">
          <input name='userEmail' type='text' placeholder='Email' required value={details.userEmail} onChange={Change}></input>
        </div>
        <div className="input_box">
          <input name='userContact' type='text' placeholder='Contact' required value={details.userContact} onChange={Change}></input>
        </div>
        <div className="input_box">
          <input name='userPassword' type='password' placeholder='Password' required value={details.userPassword} onChange={Change}></input>
        </div>
        <div className="input_box">
          <input name='userRePassword' type='password' placeholder='Re-Enter Password' required value={rePass} onChange={Change}></input>
        </div>
        <div className='terms'>
          <label><input type='checkbox'/> By signing up you accept the <a href='#'>Terms of service and Privacy Policy</a></label>
        </div>
        <div className='sign_btn'>
            <button onClick={submitter}>
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