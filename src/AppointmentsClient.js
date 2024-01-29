import React, { useState, useEffect } from 'react';
import './AppointmentsClient.css'; // Importe os estilos necessários
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Função para obter os agendamentos
  const fetchAppointments = async () => {
    try {
      // Obtenha o token de algum lugar (por exemplo, armazenado no estado ou localStorage)
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiYXJiZXJ3ZWJzaXRlIiwic3ViIjoiZmlsaXBlQGdtYWlsIiwiZXhwIjoxNzA2NDk5MzM3fQ._Gd0uWSe-oA-famgiGSZ9MlDlaoMTyrseC0kEmyhMiA';

      // Fazer requisição GET para obter os agendamentos
      const response = await axios.get('http://localhost:8083/agendamento/2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Atualizar o estado com os agendamentos obtidos
      setAppointments(response.data);
    } catch (error) {
      console.error('Erro ao obter agendamentos:', error);
    }
  };

  useEffect(() => {
    // Chamar a função de obtenção de agendamentos ao montar o componente
    fetchAppointments();
  }, []); // O segundo parâmetro vazio garante que o efeito será executado apenas uma vez, ao montar o componente

  const handleDeleteAppointment = async (id) => {
    try {
      // Fazer requisição DELETE para excluir o agendamento
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiYXJiZXJ3ZWJzaXRlIiwic3ViIjoiZmlsaXBlQGdtYWlsIiwiZXhwIjoxNzA2NDk5MzM3fQ._Gd0uWSe-oA-famgiGSZ9MlDlaoMTyrseC0kEmyhMiA';
      await axios.delete(`http://localhost:8083/agendamento/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Recarregar a lista de agendamentos após a exclusão
      fetchAppointments();
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  return (
    <div className='appointments'>
      <h2>Meus Agendamentos</h2>
      {appointments.length > 0 ? (
        <div className='appointment-boxes'>
          {appointments.map(appointment => (
            <div key={appointment.id} className='appointment-box'>
              <p>Barbeiro: {appointment.barberName}</p>
              <p>Data: {new Date(appointment.date).toLocaleDateString()}</p>
              <p>Tipo de Agendamento: {appointment.appointmentType}</p>
              <button onClick={() => handleDeleteAppointment(appointment.id)}>
                Excluir Agendamento
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Você não tem agendamentos marcados.</p>
      )}
    </div>
  );
};

export default Appointments;
