import React, { useState } from 'react';
import './Calendar.css';
const Calendar = ({getDate}) => {
  
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
  var data = new Date();
  data.setHours(data.getHours()- 3);
  const currentDate2 = data;
  const currentDay2 = currentDate2.getUTCDate();
  const currentMonth = currentDate2.getUTCMonth();
  
  const [currentDate, setCurrentDate] = useState(data);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedDay, setSelectedDay] = useState(currentDay2);

  const calcDays = (currentDate2) => {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const daysOfWeek2 = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    const daysOfWeek3 = ['Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom', 'Seg'];
    const daysOfWeek4 = ['Qua', 'Qui', 'Sex', 'Sab', 'Dom', 'Seg', 'Ter'];
    const daysOfWeek5 = ['Qui', 'Sex', 'Sab', 'Dom', 'Seg', 'Ter', 'Qua'];
    const daysOfWeek6 = ['Sex', 'Sab', 'Dom', 'Seg', 'Ter', 'Qua', 'Qui'];
    const daysOfWeek7 = ['Sab', 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

    const diaSemana = currentDate2.getDay();
    
    
    if (diaSemana === 0) {
        return daysOfWeek;  
    } else if (diaSemana === 1) {
        return daysOfWeek2;
    } else if (diaSemana === 2) {
        return daysOfWeek3;
    } else if (diaSemana   === 3) {
        return daysOfWeek4;
    } else if (diaSemana === 4) {
        return daysOfWeek5;
    } else if (diaSemana === 5) {
        return daysOfWeek6;
    }
    
    
    return daysOfWeek7;
};

const [daysOfWeek, setDaysOfWeek] = useState(calcDays(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));




  const getCurrentMonthDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(i);
    }

    return daysInMonth;
  };

  const handleDateClick = (day) => {
    const selectedDateObject = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selectedDateObject);
    
    
    setSelectedDay(day);
    
    getDate(selectedDateObject);
    
    
  };

  const handlePrevMonth = () => {
    if (currentDate>currentDate2) {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
    setDaysOfWeek(calcDays(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)));
}
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
    setDaysOfWeek(calcDays(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)));
  };

  const renderDaysOfWeek = () => {
    
    return daysOfWeek.map((day, index) => (
      <li key={index}>{day}</li>
    ));
  };
  
  const renderDaysOfMonth = () => {
    const daysInMonth = getCurrentMonthDays();
  
    return daysInMonth.map((day) => {
      const currentDateObject = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isPastDay = day < currentDay2 && currentDate.getUTCMonth() == currentMonth;
      
      return (
        <li
          key={day}
          className={`${selectedDay === day ? 'active' : ''} ${isPastDay ? 'disabled' : ''}`}
          onClick={isPastDay ? null : () => handleDateClick(day)}
        >
          {day}
        </li>
      );
    });
  };
  

  return (
    <div>
      <div className="calendarFull">
      <div className="month">
        <ul>
          <li className="prev" onClick={handlePrevMonth}>&#10094;</li>
          <li className="next" onClick={handleNextMonth}>&#10095;</li>
          <li>{months[currentDate.getMonth()]}<br /><span style={{ fontSize: '18px' }}>{currentDate.getFullYear()}</span></li>
        </ul>
      </div>

      <ul className="weekdays">
        {renderDaysOfWeek()}
      </ul>

      <ul className="days">
        {renderDaysOfMonth()}
      </ul>
      </div>
       
    </div>
  );
};

export default Calendar;
