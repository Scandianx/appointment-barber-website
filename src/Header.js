// Header.js
import React from 'react';
import './Header.css'; // Importe os estilos do cabeçalho
import logo from './imgs/logo.png';
import perfil from './imgs/download.png';

const Header = ({changeState}) => {
  // Função a ser chamada ao clicar em "Início"
  const handleInicioClick = () => {
    // Lógica a ser executada ao clicar em "Início"
    changeState('location')
    // Adicione a lógica desejada aqui
  };

  // Função a ser chamada ao clicar em "Agendamentos"
  const handleAgendamentosClick = () => {
    // Lógica a ser executada ao clicar em "Agendamentos"
    changeState('appointments')
    console.log("zzzzzz")
    // Adicione a lógica desejada aqui
  };

  return (
    <div className='header'>
      <div className='logo'>
        {/* Adicione a sua logo aqui */}
        <img src={logo} alt="Logo" />
      </div>

      <div className='links'>
        <a label='Início' onClick={handleInicioClick}>Início</a>
        <a label='Agendamentos' onClick={handleAgendamentosClick}>Agendamentos</a>
      </div>

      <div className='profile'>
        {/* Adicione a sua foto de perfil aqui */}
        <img src={perfil} alt="Foto de Perfil" />
      </div>
    </div>
  );
};

export default Header;
