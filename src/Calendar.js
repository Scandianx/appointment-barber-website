import React, { useState } from 'react';

const Calendar = () => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <li key={index}>{day}</li>
    ));
  };

  const renderDaysOfMonth = () => {
    const daysInMonth = getCurrentMonthDays();

    return daysInMonth.map((day) => (
      <li
        key={day}
        className={selectedDate && currentDate.getDate() === day ? 'active' : ''}
        onClick={() => handleDateClick(day)}
      >
        {day}
      </li>
    ));
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
