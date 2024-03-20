import React, { useState } from 'react';
import './BarberBookingAPP.css';
import ModernBox from './ModernBox';
import BoxService from './BoxService';
import daniloImage from './imgs/danilo.png'
import EndrilImage from './imgs/AlexandreImage.png'
import AlexandreImage from './imgs/EndrilImage.png'
import BoxData from './BoxData';
import logo from './imgs/logo.png';
import BoxLocation from './BoxLocation';
import imageState from './imgs/image-removebg-preview (3).png'
import imageState2 from './imgs/image-removebg-preview (2).png'
import imageState3 from './imgs/image-removebg-preview (1).png'
import Header from './Header';
import Appointments from './AppointmentsClient';
import Local1 from './imgs/Screenshot_9.png'
import Local2 from './imgs/Screenshot_11.png'
import Joao from './imgs/barber2.png'
import Kledson from './imgs/barber3.png'
import Hugo from './imgs/barber1.png'
import tesoura2 from './imgs/tesoura2.png'
import navalha from './imgs/navalha.png'
import med from './imgs/med.png'
import maquina from './imgs/maquina.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChooseLocation = ({ onNext, locatinChoosed }) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  
  const handleLocationSelection = (location) => {
    setSelectedLocation(location);
    locatinChoosed(location)
    onNext('barber'); 
    console.log(location)
  };

  return (
    
     <div className='location-css'>
      
      <div className='img-location'><img src={imageState}></img></div>
      <div className='boxs'>
      <ul className="list-unstyled">
        
     <li onClick={() => handleLocationSelection('1')}><BoxLocation profileImage={Local1} address="Av. Antônio Penedo dos Santos Castro, 56 – Centro, Cachoeiro de Itapemirim – ES 29300-022" /></li>
     <li onClick={() => handleLocationSelection('2')}><BoxLocation profileImage={Local2} address="Av. Francisco  de Aguiar, 199 - Gilberto Machado, Cachoeiro de Itapemirim - ES, 29303-38" /></li>
     
   </ul>
   </div>
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
    <div className='location-css2'>
      <div className='img-location2'><img src={imageState2}></img></div>
      <div className='boxs2'>
      <ul className="list-unstyled">
        <li onClick={() => handleBarberSelection('Danilo')}><ModernBox profileImage={daniloImage} name="Danilo" /></li>
        <li onClick={() => handleBarberSelection('Endril')}><ModernBox profileImage={EndrilImage} name="Endril" /></li>
        <li onClick={() => handleBarberSelection('Alexandre')}><ModernBox profileImage={AlexandreImage} name="Alexandre" /></li>
      </ul>
      </div>
    </div>
  );}
  else {
    return (
      <div className='location-css2'>
      <div className='img-location2'><img src={imageState2}></img></div>
      <div className='boxs2'>
      <ul className="list-unstyled">
        <li onClick={() => handleBarberSelection('Hugo')}><ModernBox profileImage={Hugo} name="Hugo" /></li>
        <li onClick={() => handleBarberSelection('Joao')}><ModernBox profileImage={Joao} name="João" /></li>
        <li onClick={() => handleBarberSelection('Kledson')}><ModernBox profileImage={Kledson} name="Kledson" /></li>
      </ul>
      </div>
    </div>
    )
  }
  
};

// Componente para a escolha do serviço
const ChooseService = ({ onNext, serviceChoosed }) => {
  const [selectedService, setSelectedService] = useState('');
  

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
    
      <div className='location-css3'>
      <div className='img-location3'><img src={imageState3}></img></div>
      <div className='boxs3'>
      <ul className="list-unstyled2">
        <li onClick={() => handleServiceSelection('Corte de cabelo')}><BoxService profileImage={tesoura2} name="Corte de cabelo" duracao="30 minutos" preco="R$ 40,00" /></li>
        <li onClick={() => handleServiceSelection('Barba')}><BoxService profileImage={navalha} name="Barba" duracao="30 minutos" preco="R$ 30,00" /></li>
        <li onClick={() => handleServiceSelection('Corte e sobrancelha')}><BoxService profileImage={maquina} name="Corte e sobrancelha" duracao="30 minutos" preco="R$ 50,00" /></li>
      
      
        <li onClick={() => handleServiceSelection('Corte e relaxamento')}><BoxService profileImage={med} name="Corte e relaxamento" duracao="80 minutos" preco="R$ 40,00" /></li>
        <li onClick={() => handleServiceSelection('Corte e barba')}><BoxService profileImage={maquina} name="Corte e barba" duracao="1 hora" preco="R$ 70,00" /></li>
        <li onClick={() => handleServiceSelection('Pezinho')}><BoxService profileImage={tesoura2} name="Pezinho" duracao="15 minutos" preco="R$ 20,00" /></li>
      </ul>
      </div>
      <div>
      
      

            
        
    </div>
     
    </div>
  );
};

// Componente para a escolha do local
const ChooseDate = ({ selectedBarber, selectedService, changeNext }) => {
  let profileImage;
  let serviceValue;
  if (selectedService === 'Corte de cabelo') {
    
    serviceValue = "40,00";
  } else if (selectedService === 'Barba') {
    
    serviceValue = "30,00";
  } else if (selectedService === 'Corte e sobrancelha') {
    
    serviceValue = "50,00";
  } else if (selectedService === 'Corte e relaxamento') {
    
    serviceValue = "40,00";
  } else if (selectedService === 'Corte e barba') {
    
    serviceValue = "70,00";
  } else {
   
    serviceValue = "20,00";
  }

if (selectedBarber === 'Danilo') {
  profileImage = daniloImage;
} else if (selectedBarber === 'Endril') {
  profileImage = EndrilImage;
} else if (selectedBarber === 'Alexandre') {
  profileImage = AlexandreImage;
} else if (selectedBarber === 'Hugo') {
  profileImage = Hugo;
} else if (selectedBarber === 'Joao') {
  profileImage = Joao;
} else if (selectedBarber === 'Kledson') {
  profileImage = Kledson;
}
  return (
    
    <div>
      
      <BoxData profileImage={profileImage} barber={selectedBarber} service={selectedService} serviceImage={logo} serviceValue={serviceValue} changeNext={changeNext}/>
      
        
    </div>
  );
};

// Componente principal
function BarberBookingApp ({isAdmin}) {
  const [currentStep, setCurrentStep] = useState('location');
  const [currentBarber, setCurrentBarber] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentService, setCurrentService] = useState('');
  const [isAdmin2, setIsAdmin2] = useState(isAdmin);
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
  const handleFinal = async (nextStep) => {
    setCurrentStep(nextStep);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    toast.success('Agendamento realizado com sucesso!', {
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    
  };


  return (
    <div>
      <Header changeState={handleNextStep}/>
      
      {currentStep === 'location' && <ChooseLocation onNext={handleNextStep} locatinChoosed={handleLocation}/>}
      {currentStep === 'barber' && <ChooseBarber onNext={handleNextStep} barberChoosed={handleBarber} selectedLocation={currentLocation}/>}
      {currentStep === 'service' && <ChooseService onNext={handleNextStep} serviceChoosed={handleService}/>}
      {currentStep === 'date' && <ChooseDate selectedBarber={currentBarber} selectedService={currentService} changeNext={handleFinal}/>}
      {currentStep === 'appointments' && <Appointments isAdmin2={isAdmin2}/>}
      
      
    </div>
  );
}

export default BarberBookingApp;
