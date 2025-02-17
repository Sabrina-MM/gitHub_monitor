// src/components/Banner.jsx
import React from 'react';
import bannerImage from '../assets/GitWatch_Logo.jpg'; // Asegúrate de que el nombre y extensión sean correctos


function Banner() {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Banner" />
    </div>
  );
}

export default Banner;
