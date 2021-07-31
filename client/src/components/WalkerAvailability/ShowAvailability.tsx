import "./custom.css";

import { hConvert } from "../../utils/helpers";

import { useMutation } from "@apollo/client";
import { REMOVE_AVAILABILITY } from "../../utils/mutations";

export default function ShowAvailability({ user }: any) {
  const { availability } = user;

  interface HourlyOptions {
    [index: string]: number[];
  }

  interface AvailabilityObject {
    _id: string;
    date_start: string;
    date_end: string;
    rate: number;
    hours_available: HourlyOptions;
  }

  const weekdays = ["h", "mo", "tu", "we", "th", "fr", "sa", "su"];
  let hours: number[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  // map out generic hours with checkboxes
  const hourlyPlus = (day: string, availIndex: number) => {
    let cells: JSX.Element[] = [];
    for (const hour of hours) {
      if (day === "h") {
        let cell = (
          <td key={day + hour} className="show-hourly-hour">
            {hConvert(hour)}
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
      if (day === "h") {
        return (
          <tr key={day} className="show-hourly-column-hours ">
            <td key={day + i} className="show-hourly-day">
              {day}
            </td>
            {hourlyPlus(day, availIndex)}
          </tr>
        );
      } else {
        return (
          <tr key={day} className="show-hourly-column">
            <td key={day + i} className="show-hourly-day">
              {day}
            </td>
            {hourlyPlus(day, availIndex)}
          </tr>
        );
      }
    });
  };

  const [removeAvailability, { error }] = useMutation(REMOVE_AVAILABILITY);

  const handleAvailDelete = async (e: any, availId: string) => {
    e.preventDefault();
    console.log("attempting to delete id", availId);

    try {
      await removeAvailability({
        variables: { availId },
      });
      window.location.reload();
    } catch (e) {
      console.error("avail delete catch", e);
    }
  };

  const availabilityCards = availability.map(
    (availability: AvailabilityObject, index: number) => {
      const { _id, date_start, date_end, rate } = availability;
      return (
        <article key={index} className="show-avail-card">
          <div key={"start" + index} className="show-avail-start">
            <span className="show-avail-start-text">Start date:</span>
            <span>
              {new Date(date_start).toLocaleDateString("en-en", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                weekday: "short",
              })}
            </span>
          </div>
          <div key={"end" + index} className="show-avail-end">
            <span className="show-avail-end-text">End date:</span>
            <span>
              {new Date(date_end).toLocaleDateString("en-en", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                weekday: "short",
              })}
            </span>
          </div>
          <div key={"rate" + index} className="show-avail-rate">
            <span className="show-avail-rate-text">Rate ($/dog/hr):</span>
            <span>{rate}</span>
          </div>
          <div key={"hourly" + index} className="show-avail-hourly">
            <span className="show-avail-hourly-text">Hours available:</span>
            <table className="show-avail-hourly-table">
              <tbody className="show-hourly-availability">
                {weekdaysHourly(index)}
              </tbody>
            </table>
          </div>
          <button
            className="delete-avail-btn"
            type="submit"
            onClick={(e) => {
              handleAvailDelete(e, _id);
            }}
          >
            delete
          </button>
        </article>
      );
    }
  );

  return (
    <section>
      <div className="show-avail-card-container">{availabilityCards}</div>
    </section>
  );
}
