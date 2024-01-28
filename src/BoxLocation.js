import React from 'react';
import './BoxLocation.css'; // Certifique-se de usar o nome correto do seu arquivo CSS

export default function InfoBox({ profileImage, address }) {
  return (
    <div className="modern-box">
      <div className="profile-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <p>{address}</p>
      <button >Selecionar</button>
    </div>
    
  );
}
