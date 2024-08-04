import React, { useState, useEffect } from 'react';
import Eventdetail from './Eventdetail';
import Sidebarr from './Sidebarr';
import './MainEventDisplay.css';
import top1 from '../Images/top-5.jpeg';
import logo from '../Images/p-logo.png';
import top2 from '../Images/top-4.jpeg';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import axios from 'axios';

const MainEventDisplay = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Upcoming');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/all-categories');
        console.log('Categories fetched:', response.data.categories);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const route =() =>{
    window.location.href='/home';
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events');
        console.log('Events fetched:', response.data);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    console.log('Applying filters and sorting...');
    console.log('Selected category:', selectedCategory);
    console.log('Sort option:', sortOption);

    let updatedEvents = [...events]; // Create a copy of events

    if (selectedCategory !== 'All') {
      updatedEvents = updatedEvents.filter(event => event.eventCategory === selectedCategory);
    }
    if (sortOption === 'Upcoming') {
      // Sort by event date in ascending order (earliest first)
      updatedEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    }
    else if (sortOption === 'Popular') {
      updatedEvents.sort((a, b) => {
        const likesA = a.likes ? a.likes.length : 0;
        const likesB = b.likes ? b.likes.length : 0;
    
        if (likesB === likesA) {
          // If the like counts are the same, sort alphabetically by event name
          return a.eventName.localeCompare(b.eventName);
        }
        
        // Otherwise, sort by number of likes
        return likesB - likesA;
      });
    }

    console.log('Filtered and sorted events:', updatedEvents);
    setFilteredEvents(updatedEvents);
  }, [selectedCategory, sortOption, events]);

  useEffect(() => {
    const user = sessionStorage.getItem('userName');
    if (user) {
      setLoggedIn(true);
      setUserName(user);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  const handleSortClick = (option) => {
    setSortOption(option);
    console.log('Selected sort option:', option);
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleLogoutClick = async () => {
    try {
      const user_id = sessionStorage.getItem('user_id');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('userPassword');
      setLoggedIn(false);
      setUserName('');
      window.location.reload();
      await axios.put(`http://localhost:4000/logout/${user_id}`);      
    } catch(error) {
      console.log(`Error logging out: `, error);
    }
  };

  return (
    <div className="Event-bg">
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
      <div className="top-design">
        <div className="para">
          <p className="td-txt">Discover, Track, and Experience Global Events.</p>
        </div>
        <div className="inside-top-design-2">
          <p className="td-txt-description">
            "Stay informed and engaged with the world's most exciting events. Explore upcoming concerts, festivals, conferences, and sports matches happening globally. Track your favorite events, receive real-time updates, and immerse yourself in unforgettable experiences. Join us to connect with a vibrant community of event enthusiasts and never miss out on the action!"
          </p>
        </div>
        <div className="inside-top-design">
          <div className="itd-1">
            <img src={top1} alt="cannot be load" className="top-1-img" />
            <label className="top1-txt">Events all over from globe at one place.</label>
          </div>
          <div className="itd-2">
            <img src={top2} alt="cannot be load" className="top-2-img" />
            <label className="top2-txt">World's no:1 Event Manager platform that stands out everywhere.</label>
          </div>
        </div>
      </div>
      <h2 className="event-details-heading">Event Details</h2>
      <div className="Event-categories">
        <h2>Category</h2>
        <Dropdown>
          <MenuButton className="category-dropdown-btn">
            {selectedCategory} ▼
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => handleCategoryClick('All')}></MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} onClick={() => handleCategoryClick(category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
        <div className="sort-by-container"></div>
        <h2>Sort By</h2>
        <Dropdown>
          <MenuButton className="sort-dropdown-btn">
            {sortOption} ▼
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => handleSortClick('Upcoming')}>Upcoming Events</MenuItem>
            <MenuItem onClick={() => handleSortClick('Popular')}>Popular Events</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <Eventdetail events={filteredEvents} />
    </div>
  );
};

export default MainEventDisplay;
