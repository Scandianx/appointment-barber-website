import React, { useState } from 'react';
import './Calendar.css';
const Calendar = ({getDate}) => {
  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

  const currentDate2 = new Date();
  const currentDay2 = currentDate2.getUTCDate();
  const currentMonth = currentDate2.getUTCMonth();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedDay, setSelectedDay] = useState(currentDay2);


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
    getDate(selectedDateObject);
    setSelectedDay(day);
  };

  const handlePrevMonth = () => {
    if (currentDate>currentDate2) {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
}
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
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
