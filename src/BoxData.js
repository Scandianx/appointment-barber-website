// BarberInfoBox.js
import React from 'react';
import './BoxData.css';
import Calendar from './Calendar';

export default function BoxData({ profileImage, barber, service, serviceImage }) {
  // Horários fictícios para teste
  const fakeSchedule = [
    '09:00', '09:30', '10:00', '10:30', '11:00',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:00', '16:00'
  ];

  return (
    <div className="info-box">
      <div className="textoBarber">
        <img src={profileImage} className='barber-image' alt="Foto do Barbeiro" />
        <div className='barber-info'><h3>{barber}</h3></div>
      </div>
      <div className="service-info">
        <img src={serviceImage} className='service-image' alt="Foto do serviço" />
        <div className="serviceKind"><h3>Serviço: {service}</h3></div>
        <div className="serviceValue"><h3>Valor: {service}</h3></div>
      </div>
      <div className='calendar'><Calendar /></div>
      <div className="calendar-info">
        <h3>Horários Disponíveis</h3>
        <div className="scroll-container">
        <div className="scrolling-wrapper">
          {/* Mapeia os horários fictícios */}
          {fakeSchedule.map((time, index) => (
            <div key={index} className="schedule-item">
              {time}
            </div>
          ))}
        </div>
        </div>
      </div>
      <button className="button">Agendar</button>
    </div>
  );
}
