import React, { useState } from 'react';
import './Calendar.css';
const Calendar = () => {
  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentDate2 = new Date();
  const currentDay2 = currentDate2.getUTCDate();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
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
      const isPastDay = day < currentDay2;
      
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

      <p>Selected Date: {selectedDate ? selectedDate.toDateString() : 'None'}</p>
    </div>
  );
};

export default Calendar;
