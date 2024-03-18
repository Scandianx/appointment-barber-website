import React, { useState, useEffect } from 'react';
import './BoxHorariosDisponiveis.css';
const BoxHorariosDisponiveis = ({ currentDate }) => {
  const [loading, setLoading] = useState(true);
  const [situacaoHorarios, SetSituacaoHorarios] = useState([]);
  const [currentHour, setCurrentHour] = useState('');
  
  
  const availableHours = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];
  
  const handleConfirmacao = (time) => {
    setCurrentHour(time);
    
    // Faça algo quando um horário for clicado, se necessário
  };
  const handleCancelarAgendamento = (time) => {
    
    
  };
  const handleDesbloquearDia = (time) => {
    setCurrentHour(time);
    // Faça algo quando um horário for clicado, se necessário
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let formattedDate;
        
        
        
        
        formattedDate = currentDate.toISOString();
            
            
        
        const token = localStorage.getItem('token');
        
        const response = await fetch(
          'http://localhost:8083/agendamento/consult-appointments/barber',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
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
          SetSituacaoHorarios(data);
          
          console.log(formattedDate, "----");
          

          
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
    <div className='hours'>
    <div className="scroll-container">
      <div className="scrolling-wrapper">
        {loading ? (
          <div>Carregando horários...</div>
        ) : (
            availableHours.map((time, index) => {
                let situacaoHorario;
                if (situacaoHorarios[index] === 'livre') {
                  situacaoHorario = 'livre';
                } else if (situacaoHorarios[index] === 'ocupado') {
                  situacaoHorario = 'ocupado';
                } else {
                  situacaoHorario = 'bloqueado';
                }
                
              
                // Adicione lógica para retornar JSX com base na situação do horário
                if (situacaoHorario === 'livre') {
                  return (
                    <div
                      key={index}
                      className={`schedule-item ${currentHour === time ? 'selected' : ''}`}
                      onClick={() => handleConfirmacao(time)}
                    >
                      {time}
                    </div>
                  );
                } else if (situacaoHorario === 'ocupado') {
                  return (
                    <div
                      key={index}
                      className={`schedule-item ${currentHour === time ? 'selected' : ''} ocupado`}
                      onClick={() => handleConfirmacao(time)}
                    >
                      {time}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={`schedule-item ${currentHour === time ? 'selected' : ''} bloqueado`}
                      onClick={() => handleConfirmacao(time)}
                    >
                      {time}
                    </div>
                    
                  );
                }
              })
        )}
      </div>
    </div>
    <div className='botoes'> 
            <button onClick={() => handleCancelarAgendamento()}>Desmacar horário</button>
            <button>Desmacar horário2</button>
            <button>Desmacar horário</button>
    </div>
    </div>
  );
};

export default BoxHorariosDisponiveis;
