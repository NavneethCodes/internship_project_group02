import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import '../styles/Login_form.css';

const LoginForm = () => {
  const [details, setDetails] = useState({
    email_id: '',
    password: '',
    remember: false
  });

  function valueFetch(e) {
    const { name, value, type, checked } = e.target;
    setDetails({
      ...details,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  function getData(e) {
    console.log(details);
  }

  return (
    <div className="login-container">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: { xs: '100%', sm: '50%', md: '25ch' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px'
            }
          },
          border: "1px solid black",
          borderRadius: "20px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box',
          width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' }
        }}
        noValidate
        autoComplete="off"
        onSubmit={getData}
      >
        <TextField
          required
          id="mail_input"
          name="email_id"
          label="Email ID"
          defaultValue=""
          sx={{
            display: 'block',
            mb: 2
          }}
          onChange={valueFetch}
        />
        <TextField
          required
          id="password_input"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{
            display: 'block',
            mb: 2
          }}
          onChange={valueFetch}
        />
        <FormControlLabel
          control={<Checkbox />}
          name="remember"
          label="Remember Me"
          sx={{ color: "black", display: 'block', mb: 2 }}
          onChange={valueFetch}
        />
        <Button variant="contained" type="submit" sx={{ display: 'block', mb: 2 }}>Login</Button>
        <a href="#">Forgot password?</a>
      </Box>
    </div>
  );
}

export default LoginForm;
