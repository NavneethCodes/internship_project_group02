import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Eventdetail from './Eventdetail';
import Sidebarr from './Sidebarr'
import './MainEventDisplay.css';
import { Button } from '@mui/material';
import top1 from '../Images/top-5.jpeg';
import logo from '../Images/p-logo.png';
import top2 from '../Images/top-4.jpeg'
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
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/all-categories');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.eventCategory === selectedCategory));
    }
  }, [selectedCategory, events]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="Event-bg">
      <Sidebarr/>
      <div className="Event-navbar">
        <label><img src={logo} alt="cannot be displayed" className="nav-logo"></img><p>Gleve</p></label>
      <input type='text' placeholder="search" name="eventName"></input>
        <div className="btn-area">
          <button onClick={handleClick}>Login</button>
          <Dropdown>
            <MenuButton>Categories</MenuButton>
            <Menu>
              {categories.map((category, index) => (
                <MenuItem key={index} onClick={() => handleCategoryClick(category)}>
                  {category}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
        </div>
      </div>
      <div className="top-design">
        <div className="para"><p className="td-txt">Discover,Track , and Experience Global Events.</p></div>
      <div className="inside-top-design-2">
        <p className="td-txt-description">"Stay informed and engaged with the world's most exciting events. Explore upcoming concerts, festivals, conferences, and sports matches happening globally. Track your favorite events, receive real-time updates, and immerse yourself in unforgettable experiences. Join us to connect with a vibrant community of event enthusiasts and never miss out on the action!"</p>
      </div>
      <div className='inside-top-design'>
        <div className='itd-1'>
        <img src={top1} alt="cannot be load" className="top-1-img"></img>
        <label className="top1-txt">Events all over from globe at one place.</label>
        </div>
        <div className='itd-2'>
        <img src={top2} alt="cannot be load" className="top-2-img"></img>
        <label className="top2-txt">World's no:1 Event Manager platform that stands out everywhere.</label>
        </div>
      </div>
      </div>
      <div className="Event-display-container">
      <Eventdetail events={filteredEvents} />
      </div>
    </div>
  );
};

export default MainEventDisplay;
