import React, { useState, useEffect } from 'react';
import './App.css'; // Importe os estilos do aplicativo
import BarberBookingApp from './BarberBookingAPP';
import LoginPage from './LoginPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    document.title = 'Caio Barbearia';
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    toast.success('Login realizado com sucesso!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'green',
        color: 'white',
      },
    });
  };
  const handleAdmin = () => {
    setIsAdmin(true);
    console.log(true)
  };

 
  return (
    <div className="App">
      <ToastContainer />
      {authenticated ? (
        
        <BarberBookingApp isAdmin={isAdmin}/>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} isAdmin={handleAdmin}/>
      )}
    </div>
  );
};

export default App;
