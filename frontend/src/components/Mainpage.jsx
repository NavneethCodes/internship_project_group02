// import React from 'react';
// import '../styles/Mainpage.css';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import{Link} from 'react-router-dom'
// const Mainpage = () => {
//   return (
//     <div className="main-page">
//       <ButtonAppBar /> 
//       {/* <div classname="navabar">
//           <a href="#home">Home</a>
//           <a href="#about">About</a>
//           <a href="#events">Events</a>
//           <a href="#contact">Contact</a>
//           </div> */}
//       <section className="hero">
//         <h2>Welcome to the Event Management System</h2>
//         <p>Let's Plan Your Next Event Together</p>
//       </section>
//       <div className="basic-buttons-container">
//         <BasicButtons />
//       </div>
//     </div>
//   );
// };

// function BasicButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="contained" sx={{ backgroundColor: '#FFA500', color: 'white', borderRadius: 20 }}>
//         Get Started
//       </Button>
//     </Stack>
//   );
// }

// const ButtonAppBar = () => {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           </Typography>
//           <Link to="/login"><Button color="inherit">Login</Button></Link>
//           <Link to="/signup"><Button color="inherit">Sign Up</Button></Link>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// export default Mainpage;

import React from 'react';
import '../styles/Mainpage.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const Mainpage = () => {
  return (
    <div className="main-page">
      <ButtonAppBar />
      <section className="hero">
        <h2>Welcome to the Event Management System</h2>
        <p>Let's Plan Your Next Event Together</p>
      </section>
      <div className="basic-buttons-container">
        <BasicButtons />
      </div>
    </div>
  );
};

function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" sx={{ backgroundColor: '#FFA500', color: 'white', borderRadius: 20 }}>
        Get Started
      </Button>
    </Stack>
  );
}

const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">About</Button>
            </Link>
            <Link to="/events" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Events</Button>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Contact</Button>
            </Link>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Sign Up</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Mainpage;



