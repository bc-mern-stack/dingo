import React from "react";
import "./custom.css";

export default function ShowAvailability({ user }: any) {
  const { availability } = user;
  interface HourlyOptions {
    [index: string]: number[];
  }

  interface AvailabilityObject {
    date_start: string;
    date_end: string;
    rate: number;
    hours_available: HourlyOptions;
  }

  const weekdays = ["H", "mo", "tu", "we", "th", "fr", "sa", "su"];
  let hours: number[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  // map out generic hours with checkboxes
  const hourly = (day: string, availIndex: number) => {
    let cells: JSX.Element[] = [];
    for (const hour of hours) {
      if (day === "H") {
        let cell = (
          <td key={day + hour} className="show-hourly-hour">
            {hour}
          </td>
        );
        cells.push(cell);
      } else {
        // each of the days
        let hourlyArray =
          availability[availIndex].hours_available[0][day as string];

        let result = hourlyArray.find((output: any) => output === hour);
        // conditionally render the class names by result
        let cell = (
          <td
            key={day + hour}
            className={
              result ? "show-hourly-cell-available" : "show-hourly-cell"
            }
          ></td>
        );
        cells.push(cell);
      }
    }
    return cells;
  };
  // map out weekdays breaking them down with the hourly function
  const weekdaysHourly = (availIndex: number) => {
    return weekdays.map((day, i) => {
      return (
        <tr key={day} className="show-hourly-column">
          <td key={day + i}>{day}</td>
          {hourly(day, availIndex)}
        </tr>
      );
    });
  };
  const availabilityCards = availability.map(
    (availability: AvailabilityObject, index: number) => {
      const { date_start, date_end, rate } = availability;
      return (
        <article key={index} className="show-avail-card">
          <div key={"start" + index} className="show-avail-start">
            <span className="show-avail-start-text">Start date:</span>
            <span>{date_start}</span>
          </div>
          <div key={"end" + index} className="show-avail-end">
            <span className="show-avail-end-text">End date:</span>
            <span>{date_end}</span>
          </div>
          <div key={"rate" + index} className="show-avail-rate">
            <span className="show-avail-rate-text">Rate:</span>
            <span>{rate}</span>
          </div>
          <div key={"hourly" + index} className="show-avail-hourly">
            <span className="show-avail-hourly-text">Hourly options:</span>
            <table className="show-avail-hourly-table">
              <tbody className="show-hourly">{weekdaysHourly(index)}</tbody>
            </table>
          </div>
        </article>
      );
    }
  );
  return (
    <section>
      <h1 className="blackBar">Availability</h1>
      <div className="show-avail-card-container">{availabilityCards}</div>
    </section>
  );
}
