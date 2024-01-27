import React, { useState } from 'react';
import './BarberBookingAPP.css';
import ModernBox from './ModernBox';
import BoxService from './BoxService';
import daniloImage from './danilo.png'
import AlexandreImage from './imgs/AlexandreImage.png'
import EndrilImage from './imgs/EndrilImage.png'
import tesoura from './imgs/tesoura.png'
import Calendar from './Calendar';
import Modal from './Modal';
import BoxData from './BoxData';
import logo from './imgs/logo.png';


const ChooseBarber = ({ onNext }) => {
  const [selectedBarber, setSelectedBarber] = useState('');
  
  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
    onNext('service'); 
    console.log(barber)
  };

  return (
    <div>
      <h2>Escolha o Barbeiro</h2>
      <ul className="list-unstyled">
        <li onClick={() => handleBarberSelection('Barbeiro 1')}><ModernBox profileImage={daniloImage} name="Danilo Ferreira" /></li>
        <li onClick={() => handleBarberSelection('Barbeiro 2')}><ModernBox profileImage={AlexandreImage} name="Endril" /></li>
        <li onClick={() => handleBarberSelection('Barbeiro 3')}><ModernBox profileImage={EndrilImage} name="Alexandre Gonçalves" /></li>
      </ul>
      
    </div>
  );
};

// Componente para a escolha do serviço
const ChooseService = ({ selectedBarber, onNext }) => {
  const [selectedService, setSelectedService] = useState('');
  const [modal, setModal] = useState(false);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    
    setModal(true)
    onNext('location');
    console.log(service)
  };

  const handleNext = () => {
    if (selectedService) {
      onNext('location'); // Avança para a próxima etapa
    } else {
      alert('Por favor, escolha um serviço.');
    }
  };

  return (
    <div>
      <h2>Escolha o Serviço para {selectedBarber}</h2>
      <ul className="list-unstyled">
        <li onClick={() => handleServiceSelection('Corte')}><BoxService profileImage={tesoura} name="Corte de cabelo" duracao="1 hora" preco="R$ 40,00" /></li>
        <li onClick={() => handleServiceSelection('Barba')}><BoxService profileImage={tesoura} name="Corte de cabelo" duracao="1 hora" preco="R$ 40,00" /></li>
        <li onClick={() => handleServiceSelection('Pacote Completo')}><BoxService profileImage={tesoura} name="Corte de cabelo" duracao="1 hora" preco="R$ 40,00" /></li>
      </ul>
      <ul className="list-unstyled">
        <li onClick={() => handleServiceSelection('Corte')}><BoxService profileImage={tesoura} name="Corte de cabelo" duracao="1 hora" preco="R$ 40,00" /></li>
        <li onClick={() => handleServiceSelection('Barba')}><BoxService profileImage={tesoura} name="Corte de cabelo" duracao="1 hora" preco="R$ 40,00" /></li>
        <li onClick={() => handleServiceSelection('Pacote Completo')}><BoxService profileImage={tesoura} name="Corte de cabelo" duracao="1 hora" preco="R$ 40,00" /></li>
      </ul>
      <div>
      
      

            
        
    </div>
     
    </div>
  );
};

// Componente para a escolha do local
const ChooseLocation = ({ selectedBarber, selectedService }) => {
  return (
    <div>
      
      <BoxData profileImage={daniloImage} barber={selectedBarber} service={selectedService} serviceImage={logo}/>
            
        
    </div>
  );
};

// Componente principal
function BarberBookingApp () {
  const [currentStep, setCurrentStep] = useState('barber');
  

  const handleNextStep = (nextStep) => {
    setCurrentStep(nextStep);
  };

  return (
    <div>
      {currentStep === 'barber' && <ChooseBarber onNext={handleNextStep} />}
      {currentStep === 'service' && <ChooseService selectedBarber="Barbeiro 1" onNext={handleNextStep} />}
      {currentStep === 'location' && <ChooseLocation selectedBarber="Barbeiro 1" selectedService="Corte" />}
    </div>
  );
}

export default BarberBookingApp;
