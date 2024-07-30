import React, { useState } from 'react';
import './FlexExpand.css';
// import img1 from '../assets/01.webp';
// import img2 from '../assets/02.jpg';
// import img3 from '../assets/03.jpg';
// import img4 from '../assets/04.jpg';
// import img5 from '../assets/05.jpg';

let img6="https://wallpapers.com/images/hd/4k-minimalist-black-forest-ma3c57wla5k493zj.jpg"

const cards = [
  { img: "https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg", title: 'Cross Roads' },
  { img: "https://i.pinimg.com/originals/b6/38/38/b63838fde6a7fc5b1df6d2834ebf60eb.jpg", title: 'Codex' },
  { img: "https://c4.wallpaperflare.com/wallpaper/855/331/738/minimalism-mountains-artwork-landscape-hd-wallpaper-preview.jpg", title: 'Artofolio' },
  { img: "https://c4.wallpaperflare.com/wallpaper/285/172/9/sunset-8k-forest-4k-wallpaper-preview.jpg", title: 'United' },
  { img: "https://images8.alphacoders.com/135/1355049.png", title: 'Raagam' }
];

const Card = ({ img, title, isActive, onClick, profileImage }) => (
  <div className={`fe-card ${isActive ? 'active' : ''}`} onClick={onClick}>
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
    <div className="container100">
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