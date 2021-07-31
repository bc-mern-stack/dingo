import React, { useState } from "react";
import { ReactComponentElement } from "react";
import DatePicker from "react-date-picker";
import "./custom.css";

import { useMutation } from "@apollo/client";
import { ADD_AVAILABILITY } from "../../utils/mutations";

export default function AddAvailability({ user }: any) {
  const [startDateValue, setStartDateValue] = useState(new Date());
  const [endDateValue, setEndDateValue] = useState(new Date());
  const [rateValue, setRateValue] = useState(0);

  // define types for the hours array
  interface HourlyOptions {
    [index: string]: number[];
  }
  // create an object with those types
  let hourlyObject: HourlyOptions = {
    mo: [],
    tu: [],
    we: [],
    th: [],
    fr: [],
    sa: [],
    su: [],
  };

  const [hourlyValue, setHourlyValue] = useState<HourlyOptions>(hourlyObject);

  const hourlyChangeHandler = (e: any) => {
    const { name, value, checked } = e.target;

    if (checked === true) {
      // if the target is checked, add it
      setHourlyValue({
        ...hourlyValue,
        [name]: [...hourlyValue[name as string], parseInt(value)],
      });
    } else {
      // if the target is not checked, remove it
      setHourlyValue({
        ...hourlyValue,
        [name]: [
          ...hourlyValue[name as string].filter(
            (hour) => hour !== parseInt(value)
          ),
        ],
      });
    }
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
        let cell = (
          <td key={day + hour} className="add-hourly-cell">
            {hour}
          </td>
        );
        cells.push(cell);
      } else {
        let cell = (
          <td key={day + hour} className="add-hourly-cell">
            <input
              type="checkbox"
              name={day}
              value={hour}
              onChange={hourlyChangeHandler}
              className="add-hourly-checkbox"
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
      <tr key={day} className="add-hourly-column">
        <td>{day}</td>
        {hourly(day)}
      </tr>
    );
  });

  const handleRateChange = (e: any) => {
    setRateValue(parseInt(e.target.value));
  };

  // bring state into availability object
  const availabilityData = {
    date_start: startDateValue,
    date_end: endDateValue,
    rate: rateValue,
    hours_available: hourlyValue,
  };

  const [addAvailability, { error }] = useMutation(ADD_AVAILABILITY);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addAvailability({
        variables: availabilityData,
      });
      window.location.reload();
    } catch (error) {
      console.error("form submit catch", error);
    }
  };

  return (
    <>
      <h1 className="blackBar">Add Availability</h1>
      <form className="add-availability-form">
        <div className="add-avail-start-date">
          <span className="add-avail-start-date-text">Start Date:</span>
          <DatePicker onChange={setStartDateValue} value={startDateValue} />
        </div>
        <div className="add-avail-end-date">
          <span className="add-avail-end-date-text">End Date:</span>
          <DatePicker onChange={setEndDateValue} value={endDateValue} />
        </div>
        <div className="add-avail-rate">
          <span className="add-avail-rate-text">Rate ($ / dog / hour):</span>
          <input
            className="add-avail-rate-input"
            type="number"
            onChange={handleRateChange}
            value={rateValue}
          ></input>
        </div>
        <div className="add-avail-hourly">
          <span className="add-avail-hourly-text">Hours Available:</span>
          <table>
            <tbody className="add-hourly-availability">{weekdaysHourly}</tbody>
          </table>
        </div>
        <button className="submit-btn" type="submit" onClick={handleFormSubmit}>
          submit
        </button>
      </form>
    </>
  );
}
