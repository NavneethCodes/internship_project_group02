import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import '../styles/Login_form.css';

const Login_form = () => {
  return (
    <div className="login-container">
        <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { 
                  m: 1, 
                  width: { xs: '100%', sm: '50%', md: '25ch' } 
              },
              border: "1px solid black",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              boxSizing: 'border-box',
              width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' },
            }}
        noValidate
        autoComplete="off"
        >
            <TextField
                required
                id="outlined-required"
                label="Email ID"
                defaultValue=""
                sx={{ display: 'block', mb: 2 }}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ display: 'block', mb: 2 }}
            />
            <FormControlLabel 
              control={<Checkbox defaultChecked />} 
              label="Remember Me" 
              sx={{ color: "black", display: 'block', mb: 2 }}
            />
            <Button variant="contained" sx={{ display: 'block', mb: 2 }}>Login</Button>
            <a>Forgot password?</a>
        </Box>
    </div>
  )
}

export default Login_form;
