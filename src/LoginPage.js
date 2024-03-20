import React, { useState } from 'react';
import './LoginPage.css';
import logo from './imgs/logo.png';
const LoginPage = ({ onLoginSuccess, isAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (username==="danilo") {
      isAdmin();
    }
    
    // Substitua a URL da API pelo seu endpoint real
    const apiUrl = "http://localhost:8083/auth/login";

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
            
          localStorage.setItem('token', data.token);
          onLoginSuccess();
        } else {
          alert("Login falhou. Por favor, verifique suas credenciais.");
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo da Barbearia" />
      <form id="loginForm">
        <label htmlFor="username">Email ou telefone:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        <div className="small-text">
          <a href="#">Esqueci a senha</a> | <a href="#">Registrar</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
