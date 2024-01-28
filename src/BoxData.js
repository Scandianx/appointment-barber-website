import React, { useState, useEffect } from 'react';
import './BoxData.css';
import Calendar from './Calendar';

export default function BoxData({ profileImage, barber, service, serviceImage }) {
  const [availableHours, setAvailableHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentHour, setCurrentHour] = useState('');
  const handleTimeClick = (time) => {
    setCurrentHour(time);
  }
  const handleDate = (date) => {
    setCurrentDate(date);
    console.log(date.toISOString());
  };
  const handleSubmit = async () => {
    try {
      // Combine a data e a hora selecionada
      const selectedDateTime = new Date(currentDate);
      const [hours, minutes] = currentHour.split(':');
      selectedDateTime.setHours(Number(hours), Number(minutes));

      // Formate a data para o formato esperado pela API
      const formattedDate = selectedDateTime.toISOString();

      // Crie o objeto de agendamento
      const appointmentData = {
        appointmentType: 'HAIR_CUT',
        barber: 1,
        client: 2,
        date: formattedDate,
        comments: 'Corte de cabelo agendado',
      };

      // Envie a requisição POST
      const response = await fetch('http://localhost:8083/agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        console.log('Agendamento realizado com sucesso!');
        // Adicione lógica adicional aqui, como redirecionar o usuário ou exibir uma mensagem de sucesso
      } else {
        console.error('Erro ao realizar o agendamento.');
      }
    } catch (error) {
      console.error('Erro ao processar o agendamento:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Formatando a data no formato esperado pela API
        const formattedDate = currentDate.toISOString();

        const response = await fetch('http://localhost:8083/agendamento/consult-appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: formattedDate,
            idBarber: 1,
            type: 'HAIR_CUT',
          }),
        });

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
        <img src={profileImage} className='barber-image' alt="Foto do Barbeiro" />
        <div className='barber-info'><h3>{barber}</h3></div>
      </div>
      <div className="service-info">
        <img src={serviceImage} className='service-image' alt="Foto do serviço" />
        <div className="serviceKind"><h3>Serviço: {service}</h3></div>
        <div className="serviceValue"><h3>Valor: {service}</h3></div>
      </div>
      <div className='calendar'><Calendar getDate={handleDate} /></div>
      <div className="calendar-info">
        <h3>Horários Disponíveis</h3>
        <div className="scroll-container">
          <div className="scrolling-wrapper">
            {/* Mapeia os horários obtidos da API */}
            {loading ? (
              <div>Carregando horários...</div>
            ) : (
              availableHours.map((time, index) => (
                <div key={index} className="schedule-item" onClick={() => handleTimeClick(time)}>
                  {time}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <button className="button" onClick={() => handleSubmit()}>Agendar</button>
    </div>
  );
}