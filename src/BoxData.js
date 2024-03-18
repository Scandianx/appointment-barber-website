import React, { useState, useEffect } from 'react';
import './BoxData.css';
import Calendar from './Calendar';

export default function BoxData({
  profileImage,
  barber,
  service,
  serviceImage,
  serviceValue,
  changeNext,
}) {
  const [availableHours, setAvailableHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const date= new Date();
  const [currentDate, setCurrentDate] = useState(date);
  const [currentHour, setCurrentHour] = useState('');

  const handleTimeClick = (time) => {
    setCurrentHour(time);
  };

  const handleDate = (date) => {
    setCurrentDate(date);
    
  };

  const handleSubmit = async () => {
    let barberId = 1;
    if (barber === 'Danilo') {
      barberId = 1;
    } else if (barber === 'Endril') {
      barberId = 2;
    } else if (barber === 'Alexandre') {
      barberId = 3;
    } else if (barber === 'Hugo') {
      barberId = 4;
    } else if (barber === 'Joao') {
      barberId = 5;
    } else if (barber === 'Kledson') {
      barberId = 6;
    }

    try {
      const serviceTranslations = {
        'Corte de cabelo': 'HAIR_CUT',
        'Barba': 'BEARD',
        'Corte e sobrancelha': 'HAIR_AND_EYEBROW',
        'Corte e relaxamento': 'HAIR_AND_RELAXATION',
        'Corte e barba': 'HAIR_AND_BEARD',
        'Pezinho': 'LITTLE_HAIRCUT'
      };

      let mappedService = serviceTranslations[service];
      
      const selectedDateTime = new Date(currentDate);
      const [hours, minutes] = currentHour.split(':');
      selectedDateTime.setHours(Number(hours), Number(minutes));
      const token = localStorage.getItem('token');
      const formattedDate = selectedDateTime.toISOString();
      console.log(formattedDate)

      const appointmentData = {
        appointmentType: mappedService,
        barber: 1,
        client: token,
        date: formattedDate,
        comments: 'Corte de cabelo agendado',
      };

      const response = await fetch('http://localhost:8083/agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        console.log('Agendamento realizado com sucesso!');
        changeNext('appointments');
      } else {
        console.error('Erro ao realizar o agendamento.');
      }
    } catch (error) {
      console.error('Erro ao processar o agendamento:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let barberId = 0;
      if (barber === 'Danilo') {
        barberId = 1;
      } else if (barber === 'Endril') {
        barberId = 2;
      } else if (barber === 'Alexandre') {
        barberId = 3;
      } else if (barber === 'Hugo') {
        barberId = 4;
      } else if (barber === 'Joao') {
        barberId = 5;
      } else if (barber === 'Kledson') {
        barberId = 6;
      }

      try {
        const formattedDate = currentDate.toISOString();
        
         
        const response = await fetch(
          'http://localhost:8083/agendamento/consult-appointments',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: formattedDate,
              idBarber: 1,
              type: 'HAIR_CUT',
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAvailableHours(data);
          
          
        } else {
          console.error('Erro ao obter os horários disponíveis.');
        }
      } catch (error) {
        console.error('Erro ao realizar a requisição:', error);
      } finally {
        setLoading(false);
        
      }
    };

    fetchData();
  }, [currentDate]);

  return (
    <div className="info-box">
      <div className="textoBarber">
        <img src={profileImage} className="barber-image" alt="Foto do Barbeiro" />
        <div className="barber-info">
          <h3>{barber}</h3>
        </div>
      </div>
      <div className="service-info">
        <img src={serviceImage} className="service-image" alt="Foto do serviço" />
        <div className="serviceKind">
          <h3>Serviço: {service}</h3>
        </div>
        <div className="serviceValue">
          <h3>Valor: {serviceValue}</h3>
        </div>
      </div>
      <div className="calendar">
        <Calendar getDate={handleDate} />
      </div>
      <div className="calendar-info">
        <h3>Horários Disponíveis</h3>
        <div className="scroll-container">
          <div className="scrolling-wrapper">
            {loading ? (
              <div>Carregando horários...</div>
            ) : (
              availableHours.map((time, index) => (
                <div
                  key={index}
                  className={`schedule-item ${currentHour === time ? 'selected' : ''}`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <button className="button" onClick={() => handleSubmit()}>
        Agendar
      </button>
    </div>
  );
}
