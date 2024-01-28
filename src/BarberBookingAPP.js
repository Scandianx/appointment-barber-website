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
import BoxLocation from './BoxLocation';

const ChooseLocation = ({ onNext, locatinChoosed }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  
  const handleLocationSelection = (location) => {
    setSelectedLocation(location);
    locatinChoosed(location)
    onNext('barber'); 
    console.log(location)
  };

  return (
    
     <div>
      <ul className="list-unstyled">
        
     <li onClick={() => handleLocationSelection('1')}><BoxLocation profileImage={daniloImage} address="Danilo Ferreira" /></li>
     <li onClick={() => handleLocationSelection('2')}><BoxLocation profileImage={AlexandreImage} address="Endril" /></li>
     
   </ul>
   </div>
  );
};
const ChooseBarber = ({ onNext, barberChoosed, selectedLocation }) => {
  const [selectedBarber, setSelectedBarber] = useState('');
  
  const handleBarberSelection = (barber) => {
    setSelectedBarber(barber);
    barberChoosed(barber)
    onNext('service'); 
    
  };
  if (selectedLocation==='1') {return (
    <div>
      <h2>Escolha o Barbeiro</h2>
      <ul className="list-unstyled">
        <li onClick={() => handleBarberSelection('Danilo Ferreira')}><ModernBox profileImage={daniloImage} name="Danilo Ferreira" /></li>
        <li onClick={() => handleBarberSelection('Endril')}><ModernBox profileImage={AlexandreImage} name="Endril" /></li>
        <li onClick={() => handleBarberSelection('Alexandre Gonçalves')}><ModernBox profileImage={EndrilImage} name="Alexandre Gonçalves" /></li>
      </ul>
      
    </div>
  );}
  else {
    return (
      <div>
      <h2>Escolha o Barbeiro</h2>
      <ul className="list-unstyled">
        <li onClick={() => handleBarberSelection('Caio')}><ModernBox profileImage={daniloImage} name="Caio Barbeiro" /></li>
        
      </ul>
      
    </div>
    )
  }
  
};

// Componente para a escolha do serviço
const ChooseService = ({ onNext, serviceChoosed }) => {
  const [selectedService, setSelectedService] = useState('');
  const [modal, setModal] = useState(false);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    serviceChoosed(service);
    
    onNext('date');
    
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
      <h2>Escolha o Serviço para </h2>
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
const ChooseDate = ({ selectedBarber, selectedService }) => {
  return (
    <div>
      
      <BoxData profileImage={daniloImage} barber={selectedBarber} service={selectedService} serviceImage={logo}/>
            
        
    </div>
  );
};

// Componente principal
function BarberBookingApp () {
  const [currentStep, setCurrentStep] = useState('location');
  const [currentBarber, setCurrentBarber] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentService, setCurrentService] = useState('');
  const handleLocation = (location) => {
    setCurrentLocation(location);
  };
  const handleService = (service) => {
    setCurrentService(service);
  };
  const handleBarber = (barber) => {
    setCurrentBarber(barber);
  };

  const handleNextStep = (nextStep) => {
    setCurrentStep(nextStep);
  };

  return (
    <div>
      {currentStep === 'location' && <ChooseLocation onNext={handleNextStep} locatinChoosed={handleLocation}/>}
      {currentStep === 'barber' && <ChooseBarber onNext={handleNextStep} barberChoosed={handleBarber} selectedLocation={currentLocation}/>}
      {currentStep === 'service' && <ChooseService onNext={handleNextStep} serviceChoosed={handleService}/>}
      {currentStep === 'date' && <ChooseDate selectedBarber={currentBarber} selectedService={currentService} />}
    </div>
  );
}

export default BarberBookingApp;
