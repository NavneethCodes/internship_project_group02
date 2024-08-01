import React, { useState, useEffect } from 'react';
import './Profile.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';

const Profile = () => {
  const [form, setForm] = useState({
    userName: "",
    userPassword: "",
    newPassword: "",
    conPassword: "",
    userEmail: "",
    userContact: ""
  });

  const [initialForm, setInitialForm] = useState({
    userName: "",
    userPassword: "",
    newPassword: "",
    conPassword: "",
    userEmail: "",
    userContact: ""
  });

  const [placeholders, setPlaceholders] = useState({
    userName: "Enter your name",
    userEmail: "Enter your email",
    userContact: "Enter your contact"
  });

  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');

  function valueFetch(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSave = () => {
    if (JSON.stringify(form) === JSON.stringify(initialForm)) {
      setMessage('No changes have been made.');
      setOpenSnackbar(true);
    } else {
      setOpenPasswordDialog(true); // Show password dialog
    }
  };

  const handlePasswordSubmit = () => {
    // Verify password
    if (enteredPassword === form.userPassword) {
      axios.put(`http://localhost:4000/user-info-update/${sessionStorage.getItem("user_id")}`, form)
        .then(res => {
          setInitialForm(form);
          setMessage('Profile updated successfully.');
          setOpenSnackbar(true);
        }).catch(error => {
          console.error(error);
          setMessage('Error saving profile. Please try again.');
          setOpenSnackbar(true);
        });
    } else {
      setMessage('Incorrect password. Please try again.');
      setOpenSnackbar(true);
    }
    setEnteredPassword(''); // Clear the password field
    setOpenPasswordDialog(false); // Close the dialog
  };

  const handlePasswordClose = () => {
    setEnteredPassword(''); // Clear the password field
    setOpenPasswordDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/user-info/${sessionStorage.getItem("user_id")}`)
      .then(response => {
        const userData = {
          userName: response.data.userName || "",
          userEmail: response.data.userEmail || "",
          userContact: response.data.userContact || ""
        };
        setForm(userData);
        setInitialForm(userData);
        setPlaceholders({
          userName: userData.userName,
          userEmail: userData.userEmail,
          userContact: userData.userContact
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
        className="profile-container"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="profile-header">
          <h1>Edit Profile</h1>
        </div>
        <Stack spacing={2} direction="column">
          
          <TextField
            id="Name-input"
            label="Name"
            variant="standard"
            name="userName"
            placeholder={placeholders.userName}
            onChange={valueFetch}
            className="text-field"
          />
          <br />
          <TextField
            id="email-input"
            label="Email"
            variant="standard"
            name="userEmail"
            placeholder={placeholders.userEmail}
            onChange={valueFetch}
            className="text-field"
          />
          <br />
          <TextField
            id="contact-input"
            label="Contact"
            variant="standard"
            name="userContact"
            placeholder={placeholders.userContact}
            onChange={valueFetch}
            className="text-field"
          />
          <br />
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '16px', marginTop: '16px' }}>
            <h2 style={{ color: 'green' }}>Change Password</h2>
            <TextField
              id="current-password-input"
              label="Current Password"
              variant="standard"
              name="userPassword"
              type="password"
              onChange={valueFetch}
              className="text-field"
            />
            <br />
            <TextField
              id="new-password-input"
              label="New Password"
              variant="standard"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={valueFetch}
              className="text-field"
            />
            <br />
            <TextField
              id="con-password-input"
              label="Re-enter New Password"
              variant="standard"
              name="conPassword"
              type="password"
              value={form.conPassword}
              onChange={valueFetch}
              className="text-field"
            />
          </div>
          <br />
          <Button variant="contained" color='success' className="save-button" onClick={handleSave}>Save</Button>
        </Stack>
      </Box>

      {/* Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handlePasswordClose}>
        <DialogTitle>Enter Your Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordClose}>Cancel</Button>
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={message.includes('No changes have been made.') ? 'info' : message.includes('successfully') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Profile;
