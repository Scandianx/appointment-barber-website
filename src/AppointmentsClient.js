import React, { useState, useEffect } from 'react';
import './AppointmentsClient.css'; // Importe os estilos necessários
import axios from 'axios';
import profileImage from './imgs/AlexandreImage.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from './Calendar';
import BoxHorariosDisponiveis from './BoxHorariosDisponiveis';


const Appointments = ({isAdmin2}) => {
  const serviceTranslations = {
    'HAIR_CUT': 'Corte de cabelo',
    'BEARD': 'Barba',
    'HAIR_AND_EYEBROW': 'Corte e sobrancelha',
    'HAIR_AND_RELAXATION': 'Corte e relaxamento',
    'HAIR_AND_BEARD': 'Corte e barba',
    'LITTLE_HAIRCUT': 'Pezinho'
  };
  var data = new Date();
  data.setHours(data.getHours());
  
  const [appointments, setAppointments] = useState([]);
  const [receita, setReceita] = useState(0);
  const [clientes, setClientes] = useState(0);
  const[currentDate, setCurrentDate] = useState(data)
  const handleDate = (date) => {
    setCurrentDate(date);
    
    
  };
  // Função para obter os agendamentos
  const fetchAppointments = async () => {
    try {
      // Obtenha o token de algum lugar (por exemplo, armazenado no estado ou localStorage)
      const token = localStorage.getItem('token');
      
      let link= 'http://localhost:8083/agendamento/' + token;
      
      const response = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Atualizar o estado com os agendamentos obtidos
      setAppointments(response.data);
      console.log(response.data);
      
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
      
      const token = localStorage.getItem('token')
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
      
      {!isAdmin2 ? (
        appointments.length > 0 ? (
          <div className='appointment-boxes'>
            <h2>Meus Agendamentos</h2>
            {appointments.map(appointment => (
              <div key={appointment.id} className='appointment-box'>
                <img src={profileImage} alt="Profile" className="profile-image" />
                <p className='nome'>{appointment.barberName}</p>
                <div className='dia'><p>{new Date(appointment.date).toLocaleDateString()}</p></div>
                <p className='hora'>{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className='tipo'>{serviceTranslations[appointment.appointmentType]}</p>
                <button className='buttonA' onClick={() => handleDeleteAppointment(appointment.id)}>
                  Cancelar agendamento
                </button>
                <ToastContainer />
              </div>
            ))}
          </div>
        ) : (
          <p>Você não tem agendamentos marcados.</p>
        )
      ) : (
        <div className='appointment-boxes-barber'> 
           <div className='appointment-box-barber'>
            <div className='calendar2'>
            <Calendar getDate={handleDate}> </Calendar>
            </div>
            <div className='horarios'>
            <BoxHorariosDisponiveis currentDate={currentDate}> </BoxHorariosDisponiveis>
            </div>
            
           </div>
           <div className='appointment-box-desktop'> 
           <div className='receita'>
            <div className='faturamento'> <h4>Faturamento bruto:</h4>
            </div>   
            <p> R$ {receita}</p>
           </div>
           <div className='clientes'>
           <div className='atendimentos'> <h4>Atendimentos diários:</h4>
            </div>     
           <p>{clientes}</p>
           </div>
           </div>
        </div>

      )}
    </div>
  );
};

export default Appointments;
