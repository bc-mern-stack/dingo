import React from "react";
import "./custom.css";

export default function ShowAvailability({ user }: any) {
  const { availability } = user;
  console.log(availability);
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
      console.log(availability);
      const { date_start, date_end, rate, hours_available } = availability;
      return (
        <article>
          <div key={index + date_start}>Start date:{date_start}</div>
          <div key={index + date_end}>End date:{date_end}</div>
          <div key={index + rate}>Rate:{rate}</div>
          <div key={index}>
            <table>
              Hourly options:
              <tbody className="show-hourly-availability">
                {weekdaysHourly(index)}
              </tbody>
            </table>
          </div>
        </article>
      );
    }
  );
  return (
    <section>
      <h1 className="blackBar">Availability</h1>
      <div>{availabilityCards}</div>
    </section>
  );
}
