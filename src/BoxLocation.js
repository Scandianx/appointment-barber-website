import React from 'react';
import './BoxLocation.css'; // Certifique-se de usar o nome correto do seu arquivo CSS
import imageState from './imgs/image-removebg-preview (3).png'

export default function BoxLocation({ profileImage, address }) {
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
