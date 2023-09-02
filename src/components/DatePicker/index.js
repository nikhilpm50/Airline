import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function DateSelector({ onValueChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [selectedDate, setSelectedDate] = useState('');

  const handleSingleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    onValueChange(formattedDate);
  };

  const dateRangeInputRef = useRef(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setShowCalendar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRangeInputRef.current && !dateRangeInputRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div>
      {isRoundTrip ?
      <div>
        <div ref={dateRangeInputRef}>
          <input
            type="text"
            value={
              startDate && endDate
                ? `${startDate.toDateString()} - ${endDate.toDateString()}`
                : ''
            }
            onClick={toggleCalendar}
            readOnly
          />
          {showCalendar && (
            <div className="calendar-popup">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            </div>
          )}
        </div>
      </div> :
    <div>
    <DatePicker
      selected={selectedDate}
      onChange={handleSingleDateChange}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select a date"
    />
  </div>}
    </div>
  );
}

export default DateSelector;
