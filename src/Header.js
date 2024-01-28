// Header.js
import React from 'react';
import './Header.css'; // Importe os estilos do cabeçalho
import logo from './imgs/logo.png'
import perfil from './imgs/download.png'

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        {/* Adicione a sua logo aqui */}
        <img src={logo} alt="Logo" />
      </div>

      <div className='links'>
        <a href='#inicio'>Início</a>
        <a href='#agendamentos'>Agendamentos</a>
      </div>

      <div className='profile'>
        {/* Adicione a sua foto de perfil aqui */}
        <img src={perfil} alt="Foto de Perfil" />
      </div>
    </div>
  );
};

export default Header;
