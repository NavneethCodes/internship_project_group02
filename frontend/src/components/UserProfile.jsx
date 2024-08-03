import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './UserProfile.css';
import Sidebarr from './Sidebarr'
import Box from '@mui/material/Box';
import logo from '../Images/p-logo.png';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from '@mui/material';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #f2f2f2;
`;

const Sidebar = styled.div`
  flex: 0 0 200px;
  background: #f8f8f8;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NavButton = styled(Button)`
  && {
    margin-top:100px;
    margin-bottom: 10px;
    margin-left:30px;
    color: #333;
    text-transform: none;
    font-weight: bold;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  flex-direction: column;
`;

const ProfileAndEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const ProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-right: 20px;
`;

const EditProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Avatar = styled(motion.img)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 4px solid #ff7e5f;
`;

const UserName = styled.h2`
  margin: 0;
`;

const UserTitle = styled.p`
  color: #888;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const StatLabel = styled.p`
  margin: 0;
  color: #888;
`;

const Biography = styled.p`
  margin-top: 1rem;
  text-align: center;
`;
 
const route =() =>{
  window.location.href='/home';
}

const UserProfile = () => {
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
    userPassword: "Enter your current password",
    userEmail: "Enter your email",
    userContact: "Enter your contact"
  });

  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [registeredEventCount, setRegisteredEventCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const valueFetch = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (JSON.stringify(form) === JSON.stringify(initialForm)) {
      setMessage('No changes have been made.');
      setOpenSnackbar(true);
    } else if (form.newPassword !== form.conPassword) {
      setMessage('New passwords do not match.');
      setOpenSnackbar(true);
    } else {
      setOpenPasswordDialog(true);
    }
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === form.userPassword) {
      axios.put(`http://localhost:4000/user-info-update/${sessionStorage.getItem("user_id")}`, form)
        .then(res => {
          setInitialForm(form);
          setMessage('Profile updated successfully.');
          setOpenSnackbar(true);
        }).catch(error => {
          console.error('Error saving profile:', error);
          setMessage('Error saving profile. Please try again.');
          setOpenSnackbar(true);
        });
      setOpenPasswordDialog(false);
    } else {
      setMessage('Incorrect password. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handlePasswordClose = () => {
    setOpenPasswordDialog(false);
    setEnteredPassword('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEditClick = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleNavButtonClick = (page) => {
    setShowEditProfile(false);
    // Handle other page navigation if needed
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user-info/${sessionStorage.getItem("user_id")}`);
        const userData = {
          userName: response.data.userName || "",
          userPassword: response.data.userPassword || "",
          userEmail: response.data.userEmail || "",
          userContact: response.data.userContact || ""
        };
        setForm(userData);
        setInitialForm(userData);
        setPlaceholders({
          userName: userData.userName,
          userPassword: userData.userPassword,
          userEmail: userData.userEmail,
          userContact: userData.userContact
        });
        setRegisteredEventCount(response.data.registered_events.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    

    const fetchEventRecordData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/event-records]');
        let totalLikes = 0;
        let totalComments = 0;
        response.data.forEach(record => {
          totalLikes += record.likes.length;
          totalComments += record.comments.length;
        });
        setLikeCount(totalLikes);
        setCommentCount(totalComments);
      } catch (error) {
        console.error('Error fetching event record data:', error);
      }
    };

    fetchUserData();
    fetchEventRecordData();
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem('userName');
    if (user) {
      setLoggedIn(true);
      setUserName(user);
    }
  }, []);

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleLogoutClick = async () => {
    try {
      const user_id = sessionStorage.getItem('user_id');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('user_id');
      setLoggedIn(false);
      setUserName('');
      window.location.reload();
      window.location.href='./maineventdetails';
      await axios.put(`http://localhost:4000/logout/${user_id}`);      
    } catch(error) {
      console.log(`Error logging out: `, error);
    }
  };


  return (
    <Container>
      {loggedIn ? <Sidebarr /> : <div className="disabled-sidebar"><Sidebarr /></div>}
      <div className="Event-navbar">
        <label onClick={route}>
          <img src={logo} alt="cannot be displayed" className="nav-logo" />
          <p>Gleve</p>
        </label>
        <input type="text" placeholder="search" name="eventName" />
        <div className="btn-area">
          {loggedIn ? (
            <>
              <div className='user-name-container'><span className="user-name">{userName}</span></div>
              <button onClick={handleLogoutClick}>Logout</button>
            </>
          ) : (
            <button onClick={handleLoginClick}>Login</button>
          )}
        </div>
      </div>
      <Sidebar>
        {/* <NavButton onClick={() => handleNavButtonClick('users')}>USERS</NavButton> */}
        {/* <NavButton onClick={() => handleNavButtonClick('events')}>EVENTS</NavButton> */}
        {/* <NavButton onClick={() => handleNavButtonClick('createEvent')}>CREATE EVENT</NavButton> */}
        <NavButton onClick={handleEditClick}>{showEditProfile ? 'Close Edit' : 'Edit Profile'}</NavButton>
      </Sidebar>
      <MainContent>
        <ProfileAndEditContainer>
          <ProfileContainer
            initial={{ x: showEditProfile ? 0 : -300, opacity: showEditProfile ? 0 : 1 }}
            animate={{ x: showEditProfile ? -300 : 0, opacity: showEditProfile ? 1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar
              src="https://via.placeholder.com/100"
              alt="Profile"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <UserName>{placeholders.userName}</UserName>
            <UserTitle>Web Developer</UserTitle>
            <Stats>
              <Stat>
                <StatNumber>{likeCount}</StatNumber>
                <StatLabel>Like Count</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{commentCount}</StatNumber>
                <StatLabel>Comments</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{registeredEventCount}</StatNumber>
                <StatLabel>Registered Events</StatLabel>
              </Stat>
            </Stats>
            <Biography>
              Hello, I'm John, a passionate web developer with a love for creating amazing user experiences. In my free time, I enjoy hiking and photography.
            </Biography>
          </ProfileContainer>
          {showEditProfile && (
            <EditProfileContainer
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Edit Profile</h1>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                  width: '100%',
                  '& .MuiTextField-root': { marginBottom: '1rem' },
                  '& .MuiButton-root': {
                    borderRadius: '10px',
                    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                    color: 'white',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                  },
                  '& .MuiButton-root:hover': {
                    background: 'linear-gradient(to right, #ff7e5f, #ff7e5f)',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)'
                  },
                  '& .MuiTextField-root input': {
                    background: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <TextField
                      label="Name"
                      variant="outlined"
                      name="userName"
                      // value={form.userName}
                      placeholder={placeholders.userName}
                      onChange={valueFetch}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          background: 'white',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff7e5f'
                        },
                        '& .MuiInputLabel-outlined': {
                          color: '#ff7e5f'
                        }
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="Email"
                      variant="outlined"
                      name="userEmail"
                      // value={form.userEmail}
                      placeholder={placeholders.userEmail}
                      onChange={valueFetch}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          background: 'white',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff7e5f'
                        },
                        '& .MuiInputLabel-outlined': {
                          color: '#ff7e5f'
                        }
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="Contact"
                      variant="outlined"
                      name="userContact"
                      // value={form.userContact}
                      placeholder={placeholders.userContact}
                      onChange={valueFetch}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          background: 'white',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff7e5f'
                        },
                        '& .MuiInputLabel-outlined': {
                          color: '#ff7e5f'
                        }
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="Current Password"
                      variant="outlined"
                      type="password"
                      name="userPassword"
                      // value={form.userPassword}
                      // placeholder={placeholders.userPassword}
                      onChange={valueFetch}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          background: 'white',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff7e5f'
                        },
                        '& .MuiInputLabel-outlined': {
                          color: '#ff7e5f'
                        }
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="New Password"
                      variant="outlined"
                      type="password"
                      name="newPassword"
                      // value={form.newPassword}
                      onChange={valueFetch}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          background: 'white',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff7e5f'
                        },
                        '& .MuiInputLabel-outlined': {
                          color: '#ff7e5f'
                        }
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="Confirm New Password"
                      variant="outlined"
                      type="password"
                      name="conPassword"
                      // value={form.conPassword}
                      onChange={valueFetch}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          background: 'white',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff7e5f'
                        },
                        '& .MuiInputLabel-outlined': {
                          color: '#ff7e5f'
                        }
                      }}
                    />
                  </FormControl>
                  <Button
                    onClick={handleSave}
                    sx={{
                      backgroundColor: '#ff7e5f',
                      color: 'white',
                      marginTop: '1rem',
                      borderRadius: '10px',
                      padding: '0.75rem 1.5rem',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#ff5f5f'
                      }
                    }}
                  >
                    Save Changes
                  </Button>
                </Stack>
              </Box>
            </EditProfileContainer>
          )}
        </ProfileAndEditContainer>
      </MainContent>
      <Dialog open={openPasswordDialog} onClose={handlePasswordClose}>
        <DialogTitle>Confirm Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordClose}>Cancel</Button>
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
