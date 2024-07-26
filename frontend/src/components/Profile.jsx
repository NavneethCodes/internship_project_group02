import React, { useState,useEffect } from 'react';
import './Profile.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom'

const Profile = () => {
  /*  const [count,setCount]=useState(0);
  let valueAdd=()=>{
    setCount(count+1)
  } */
const [form,setForm]=useState(
  {
    FirstName:'',
    LastName:'',
    username:'',
    gender:'',
    dOB:'',
    email:'',
    contact:'',
    password:''

  }
)
var navigate = useNavigate();

  function valueFetch (e){
     // console.log(e)
     setForm({...form,[e.target.name]:e.target.value})
}

const location = useLocation()


  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off" 
      >
        <Stack spacing={2} direction="column">
          <h1 style={{color:'green'}}>Profile</h1>
          <TextField id="FirstName-input" label="First Name" variant="standard" name="FirstName" value={form.FirstName} onChange={valueFetch}  />
          <br />
          <TextField id="LastName-input" label="Last Name" variant="standard"  name="LastName" value={form.LastName} onChange={valueFetch}/>
          <br />
          <TextField id="username-input" label="Username" variant="standard"  name="username" value={form.username} onChange={valueFetch}/>
          <br />
          <TextField id="gender-input" label="Gender (Optional)" variant="standard"  name="gender"  value={form.gender} onChange={valueFetch}/>
          <br />
          <TextField id="dOB-input" label="DOB (Optional)" variant="standard"  name="dOB"  value={form.dOB} onChange={valueFetch}/>
          <br />
          <TextField id="email-input" label="Email" variant="standard"  name="email"  value={form.email} onChange={valueFetch}/>
          <br />
          <TextField id="contact-input" label="Contact" variant="standard"  name="contact"  value={form.contact} onChange={valueFetch}/>
          <br />
          <TextField id="password-input" label="Password" variant="standard"  name="password"  value={form.password} onChange={valueFetch}/>
          <br />
          <Button variant="contained" color='success' onClick={{}}>Save</Button>
        </Stack>
      </Box>
    </>
  );
  
}


export default Profile