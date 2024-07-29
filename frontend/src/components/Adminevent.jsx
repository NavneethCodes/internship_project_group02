import React, { useState,useEffect } from 'react';
// import './Adminevent.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom'

const Adminevent = () => {
  /*  const [count,setCount]=useState(0);
  let valueAdd=()=>{
    setCount(count+1)
  } */
const [form,setForm]=useState(
  {
    Eventname:'',
    Title:'',
    Date:'',
    Time:'',
    Location:'',
    Description:'',
    Organizer:''
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
          <h1 style={{color:'green'}}>Add Events </h1>
          <TextField id="Eventname-input" label="Event Name" variant="standard" name="Eventname" value={form.Eventname} onChange={valueFetch}  />
          <br />
          <TextField id="Title-input" label="Title" variant="standard"  name="Title" value={form.Title} onChange={valueFetch}/>
          <br />
          <TextField id="Date-input" label="Date" variant="standard"  name="Date" value={form.Date} onChange={valueFetch}/>
          <br />
          <TextField id="Time-input" label="Time" variant="standard"  name="Time"  value={form.Time} onChange={valueFetch}/>
          <br />
          <TextField id="Location-input" label="Location" variant="standard"  name="Location"  value={form.Location} onChange={valueFetch}/>
          <br />
          <TextField id="Description-input" label="Description" variant="standard"  name="Description"  value={form.Description} onChange={valueFetch}/>
          <br />
          <TextField id="Organizer-input" label="Organizer" variant="standard"  name="Organizer"  value={form.Organizer} onChange={valueFetch}/>
          <br />
          <Button variant="contained" color='success' onClick={{}}>Add</Button>
        </Stack>
      </Box>
    </>
  );
  
}


export default Adminevent