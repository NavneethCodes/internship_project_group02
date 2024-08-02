import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../styles/Sidebarr.css';

export default function Sidebarr() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: 250,height:'100%',padding:'0px',margin:'0px' }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      className={`drawer-content ${open ? 'drawer-expanded' : 'drawer-collapsed'}`}
    >
      <List className="drawer-list" sx={{backgroundColor:'rgba(255, 255, 255, 0.996)',height:'100%'}}>
        {['Home','Profile'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link to={`/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <HomeSharpIcon/> :
                   index === 1 ? <PersonIcon /> :
                   <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ transition: 'transform 1s ease, opacity 1s ease', transform: open ? 'translateX(0)' : 'translateX(-100%)', opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1300,
          background:'rgba(255, 255, 255, 0.996)',
          color:'black',
        }}
      >
        <IoReorderThreeOutline
          className={`hamburger-icon ${open ? 'open' : ''}`}
          style={{ fontSize: '2.5rem',}}
        />
      </IconButton>
      <Drawer
        anchor='left'
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            transition: 'transform 0.3s ease',
            transform: open ? 'translateX(0%)' : 'translateX(-100%)',
            zIndex: 1200,
          },
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
}
