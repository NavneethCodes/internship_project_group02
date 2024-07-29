import React, { useState,useEffect } from 'react';
import './Profile.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom'

const Profile = () => {
  const [form,setForm]=useState({
    userName: "",
    userPassword: "",
    newPassword: "",
    conPassword: "",
    userEmail: "",
    userContact: ""
  })

function valueFetch (e){
   setForm({...form,[e.target.name]:e.target.value});
}

const location = useLocation();
const navigation = useNavigate();

useEffect(() => {
  axios.get('http://localhost:4000/user-info/6696a1b3fcb930e9f8ab5f07')
    .then(response => {
      setForm({
        userName: response.data.userName || "",
        userPassword: response.data.userPassword || "",
        userEmail: response.data.userEmail || "",
        userContact: response.data.userContact || ""
      });
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}, []);

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
          <h1 style={{color:'green'}}>Edit Profile</h1>
          <TextField id="Name-input" label="Name" variant="standard" name="userName" value={form.userName} onChange={valueFetch}  />
          <br />
          <TextField id="email-input" label="Email" variant="standard"  name="userEmail"  value={form.userEmail} onChange={valueFetch}/>
          <br />
          <TextField id="contact-input" label="Contact" variant="standard"  name="userContact"  value={form.userContact} onChange={valueFetch}/>
          <br />
          <TextField id="new-password-input" label="New Password" variant="standard"  name="newPassword"  value={form.newPassword} onChange={valueFetch}/>
          <br />
          <TextField id="con-password-input" label="Re enter Password" variant="standard"  name="conPassword"  value={form.conPassword} onChange={valueFetch}/>
          <br />
          <Button variant="contained" color='success' >Save</Button>
        </Stack>
      </Box>
    </>
  );
  
}

export default Profile;
