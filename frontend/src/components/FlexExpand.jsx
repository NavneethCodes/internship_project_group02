import React, { useState } from 'react';
import './FlexExpand.css';
import img1 from '../assets/01.webp';
import img2 from '../assets/02.jpg';
import img3 from '../assets/03.jpg';
import img4 from '../assets/04.jpg';
import img5 from '../assets/05.jpg';
import img6 from '../assets/02.jpg'; // Replace with your profile image path

const cards = [
  { img: img1, title: 'GTA 6' },
  { img: img2, title: 'Spider-Man PS5' },
  { img: img3, title: 'God Of War' },
  { img: img4, title: 'The Last of Us' },
  { img: img5, title: 'Elden Ring' }
];

const Card = ({ img, title, isActive, onClick, profileImage }) => (
  <div className={`card ${isActive ? 'active' : ''}`} onClick={onClick}>
    <img className="background" src={img} alt={title} />
    <div className="card-content">
      <div className="profile-image">
        <img src={img6} alt="Profile" />
      </div>
      <h3 className="title">{title}</h3>
    </div>
    <div className="backdrop"></div>
  </div>
);

const FlexExpand = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container">
      {cards.map((card, index) => (
        <Card
          key={index}
          img={card.img}
          title={card.title}
          isActive={activeIndex === index}
          onClick={() => handleCardClick(index)}
          profileImage={img6}
        />
      ))}
    </div>
  );
};

export default FlexExpand;


