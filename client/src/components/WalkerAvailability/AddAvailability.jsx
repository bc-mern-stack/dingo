import React, { useState } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-date-picker";

export default function AddAvailability({ user }) {
  const [startDateValue, onStartDateChange] = useState(new Date());
  const [endDateValue, onEndDateChange] = useState(new Date());

  // map out generic weekdays
  // each weekday has all 24hrs with a boolean value in each
  const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const hourly = () => {
    let cells = [];
    for (const hour of hours) {
      let cell = <td>{hour}</td>;
      cells.push(cell);
    }
    return cells;
  };
  const weekdaysHourly = weekdays.map((day) => {
    return <tr>{hourly()}</tr>;
  });

  return (
    <>
      <h1 className="blackBar">Add Availability</h1>
      <div>
        <span>Start Date:</span>
        <DatePicker onChange={onStartDateChange} value={endDateValue} />
      </div>
      <div>
        <span>End Date:</span>
        <DatePicker onChange={onEndDateChange} value={startDateValue} />
      </div>
      <div>
        <span>Rate ($ / dog / hour):</span>
        <input
          type="number"
          onChange={onEndDateChange}
          value={startDateValue}
        ></input>
      </div>
      <div>
        <span>Hours Available:</span>
        {weekdaysHourly}
      </div>
    </>
  );
}
