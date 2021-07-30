import React, { useState } from "react";
import { ReactComponentElement } from "react";
import DatePicker from "react-date-picker";
import "./custom.css";

export default function AddAvailability({ user }: any) {
  const [startDateValue, setStartDateValue] = useState(new Date());
  const [endDateValue, setEndDateValue] = useState(new Date());
  const [rateValue, setRateValue] = useState(0);
  const [hourlyValue, setHourlyValue] = useState({
    mo: [],
    tu: [],
    we: [],
    th: [],
    fr: [],
    sa: [],
    su: [],
  });

  const hourlyChangeHandler = (e: any) => {
    const { name, value } = e.target;
    console.log("hourly before set", hourlyValue);
    // check the hourly values here

    // if the value is not in the list, add it

    // if the value is in the list, remove it

    setHourlyValue({
      ...hourlyValue,
      [name]: [parseInt(value)],
    });
  };

  // map out generic weekdays
  const weekdays = ["H", "mo", "tu", "we", "th", "fr", "sa", "su"];
  let hours: number[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  // map out generic hours with checkboxes
  const hourly = (day: string) => {
    let cells: JSX.Element[] = [];
    for (const hour of hours) {
      if (day === "H") {
        let cell = <td key={day + hour}>{hour}</td>;
        cells.push(cell);
      } else {
        let cell = (
          <td key={day + hour} className="availability-cell">
            &nbsp;
            <input
              type="checkbox"
              name={day}
              value={hour}
              onChange={hourlyChangeHandler}
            ></input>
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

  const handleRateChange = (e: any) => {
    setRateValue(e.target.value);
  };

  // bring state into availability object
  const availabilityData = {
    start_date: startDateValue,
    end_date: endDateValue,
    rate: rateValue,
    hours_available: hourlyValue,
  };

  const handleFormSubmit = () => {
    // this will eventually call the mutation
    console.log(availabilityData);
  };

  return (
    <>
      <h1 className="blackBar">Add Availability</h1>
      <div>
        <span>Start Date:</span>
        <DatePicker onChange={setStartDateValue} value={startDateValue} />
      </div>
      <div>
        <span>End Date:</span>
        <DatePicker onChange={setEndDateValue} value={endDateValue} />
      </div>
      <div>
        <span>Rate ($ / dog / hour):</span>
        <input
          type="number"
          onChange={handleRateChange}
          value={rateValue}
        ></input>
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
