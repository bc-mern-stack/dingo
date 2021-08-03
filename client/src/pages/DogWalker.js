import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Calendar from "react-calendar";

import "../components/Walker/custom.css";

import WalkerCard from "../components/Walker/WalkerCard";
import WalkerAppointments from "../components/Walker/WalkerAppointments";
import WalkerAvailabilty from "../components/Walker/WalkerAvailability";
import ScheduleAppointments from "../components/Walker/ScheduleAppointments";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

function DogWalker() {
  const { username: userParam } = useParams();

  const [calendarValue, onCalendarChange] = useState(new Date());

  const { loading, data, error } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // checks for both kinds of responses, either me or user
  const user = data?.me || data?.user || {};

  const { availability } = user;

  let allAvailableDates = [];

  try {
    for (let avail of availability) {
      let dates = avail.dates_available || [];
      let availableDates = dates.map((date) => new Date(date).toDateString());
      allAvailableDates = allAvailableDates.concat(availableDates);
    }
  } catch (e) {}

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="error">{error.toString()}</div>;
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="flex-column">
      <div className="walker-profile">
        <div className="walker-userNav">
          <h1>Dog Walking Availability</h1>
          <nav className="walker-userNav-links">
            <Link to="/">
              <h2 className="logout" type="button" onClick={logout}>
                Logout /
              </h2>
            </Link>
            <Link to="/">
              <h2>Home</h2>
            </Link>
          </nav>
        </div>

        <div className="walker-profile-card-container">
          <h1 className="walker-blackBar">{user.username}</h1>
          <div className="walker-profile-top">
            <div className="walker-calendar-card">
              <h4>Walker Calendar:</h4>
              <Calendar
                onChange={onCalendarChange}
                value={calendarValue}
                tileDisabled={({ activeStartDate, date, view }) => {
                  let available = allAvailableDates.includes(
                    date.toDateString()
                  );
                  return !available;
                }}
              />
            </div>

            <WalkerCard user={user} userParam={userParam}></WalkerCard>
          </div>

          {userParam ? (
            user.availability?.length > 0 ? (
              <ScheduleAppointments
                user={user}
                userParam={userParam}
                calendarValue={calendarValue}
              />
            ) : (
              "this user has no availability, walking appointments cannot be made!"
            )
          ) : (
            // show user's appointments when they are looking at their own profile
            <WalkerAppointments
              user={user}
              userParam={userParam}
              calendarValue={calendarValue}
            />
          )}
        </div>
        <WalkerAvailabilty
          user={user}
          userParam={userParam}
        ></WalkerAvailabilty>
      </div>
      <div className="bottomOrange"></div>
    </div>
  );
}

export default DogWalker;
