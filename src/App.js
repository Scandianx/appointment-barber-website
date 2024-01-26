// App.js
import React from 'react';
import Header from './Header';
import './App.css'; // Importe os estilos do aplicativo
import ModernBox from './ModernBox';
import BarberBookingApp from './BarberBookingAPP';

const App = () => {
  return (
    <div className="App">
      <Header />
      
      <BarberBookingApp />
    </div>
  );
};

export default App;
