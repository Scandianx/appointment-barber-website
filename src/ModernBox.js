import React from 'react';
import './ModernBox.css'; // Certifique-se de criar o arquivo CSS correspondente

export default function ModernBox({ profileImage, name }) {
  return (
    <div className="modern-box">
      <div className="profile-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <h2>{name}</h2>
      
      <button >Selecionar</button>
    </div>
  );
};
