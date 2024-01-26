import React from 'react';
import './BoxService.css'; // Certifique-se de criar o arquivo CSS correspondente

export default function BoxService({ profileImage, name, duracao, preco }) {
  return (
    <div className="modern-box">
      <div className="profile-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <h3>{name}</h3>
      <h3>{duracao}</h3>
      <h3>{preco}</h3>

      
      <button >Selecionar</button>
    </div>
  );
};