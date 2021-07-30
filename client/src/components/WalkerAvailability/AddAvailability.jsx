import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "./custom.css";

export default function AddAvailability({ user }) {
  const [startDateValue, onStartDateChange] = useState(new Date());
  const [endDateValue, onEndDateChange] = useState(new Date());
  const [rateValue, onRateChange] = useState(0);
  const [hourlyValue, onHourlyChange] = useState({
    mo: [],
    tu: [],
    we: [],
    th: [],
    fr: [],
    sa: [],
    su: [],
  });

  // map out generic weekdays
  const weekdays = ["H", "mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  let hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  // map out generic hours with checkboxes
  const hourly = (day) => {
    let cells = [];
    for (const hour of hours) {
      if (day === "H") {
        let cell = <td key={(day, hour)}>{hour}</td>;
        cells.push(cell);
      } else {
        let cell = (
          <td key={(day, hour)} className="availability-cell">
            &nbsp;
            <input type="checkbox"></input>
          </td>
        );
        cells.push(cell);
      }
    }
    return cells;
  };
  // map out weekdays breaking them down with the hourly function
  const weekdaysHourly = weekdays.map((day) => {
    return (
      <tr key={day} className="availability-column">
        <td>{day}</td>
        {hourly(day)}
      </tr>
    );
  });

  // bring state into availability object
  const availabilityData = {
    start_date: startDateValue,
    end_date: endDateValue,
    rate: rateValue,
    hours_available: hourlyValue,
  };

  const handleFormSubmit = (event) => {
    // this will eventually call the mutation
    console.log(availabilityData);
  };

  return (
    <>
      <h1 className="blackBar">Add Availability</h1>
      <div>
        <span>Start Date:</span>
        <DatePicker onChange={onStartDateChange} value={startDateValue} />
      </div>
      <div>
        <span>End Date:</span>
        <DatePicker onChange={onEndDateChange} value={endDateValue} />
      </div>
      <div>
        <span>Rate ($ / dog / hour):</span>
        <input type="number" onChange={onRateChange}></input>
      </div>
      <div>
        <span>Hours Available:</span>
        <table>
          <tbody className="add-availability">{weekdaysHourly}</tbody>
        </table>
      </div>
      <button className="submit-btn" type="submit" onClick={handleFormSubmit}>
        submit
      </button>
    </>
  );
}
