import React, { useState } from 'react';
import Header from './Header';
import './App.css'; // Importe os estilos do aplicativo
import ModernBox from './ModernBox';
import BarberBookingApp from './BarberBookingAPP';
import LoginPage from './LoginPage';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div className="App">
      
      {authenticated ? (
        
        <BarberBookingApp />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
