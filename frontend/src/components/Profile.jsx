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

//   let sendData=()=>{
//     // console.log(form)
//     if (location.state != null) {
//       axios.put('http://localhost:4000/movieupdation/' + location.state.movie._id, form).then((res) => {
//           alert('Data updated');
//           navigate('/')
//       }).catch((error) => {
//           console.log(error);
//       })
//   }
//     else {
//       axios.post('http://localhost:4000/newmovie',form).then((res)=>{
//         alert('Data added')
//         navigate('/')
//       }).catch((error)=>{
//         console.log(error)
//       })
//     }
//   }
//   useEffect(() => {
//     if (location.state != null) {
//         setForm({
//             ...form,
//             name: location.state.movie.movieName,
//             director: location.state.movie.movieDirector,
//             category: location.state.movie.category,
//             releaseYear: location.state.movie.release_year
//         })
//     }
// }, [])
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
          <TextField id="FirstName-input" label="First Name" variant="standard" name="FirstName" value={form.FirstName} onChange={valueFetch}  />
          <br />
          <TextField id="LastName-input" label="Last Name" variant="standard"  name="LastName" value={form.LastName} onChange={valueFetch}/>
          <br />
          <TextField id="username-input" label="Username" variant="standard"  name="username" value={form.username} onChange={valueFetch}/>
          <br />
          <TextField id="gender-input" label="Gender" variant="standard"  name="gender"  value={form.gender} onChange={valueFetch}/>
          <br />
          <TextField id="dOB-input" label="DOB" variant="standard"  name="dOB"  value={form.dOB} onChange={valueFetch}/>
          <br />
          <TextField id="email-input" label="Email" variant="standard"  name="email"  value={form.email} onChange={valueFetch}/>
          <br />
          <TextField id="contact-input" label="Contact" variant="standard"  name="contact"  value={form.contact} onChange={valueFetch}/>
          <br />
          <TextField id="password-input" label="Password" variant="standard"  name="password"  value={form.password} onChange={valueFetch}/>
          <br />
          <Button variant="contained" color='success' onClick={{sendData}}>Submit</Button>
        </Stack>
      </Box>
    </>
  );
  
}


export default Profile