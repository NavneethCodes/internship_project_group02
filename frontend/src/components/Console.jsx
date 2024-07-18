import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom'

const Add = () => {
  
const [form,setForm]=useState(
  {
    eventName:'',
    eventDate:'',
    startTime:'',
    endTime:'',
    location:'',
    description:'',
    organizer:''
  }
)
var navigate = useNavigate();

  function valueFetch (e){
     // console.log(e)
     setForm({...form,[e.target.name]:e.target.value})
}

const location = useLocation()

  let sendData=()=>{
    // console.log(form)
    if (location.state != null) {
      axios.put('http://localhost:4000/eventupdation/' + location.state.event._id, form).then((res) => {
          alert('Data updated');
          navigate('/')
      }).catch((error) => {
          console.log(error);
      })
  }
    else {
      axios.post('http://localhost:4000/newevent',form).then((res)=>{
        alert('Data added')
        navigate('/')
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
  useEffect(() => {
    if (location.state != null) {
        setForm({
            ...form,
            eventName: location.state.event.eventName,
            eventDate: location.state.event.eventDate,
            startTime: location.state.event.startTime,
            endTime: location.state.event.endTime,
            location: location.state.event.location,
            description: location.state.event.description,
            organizer: location.state.event.organizer

        })
    }
}, [])
}