import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Calendar from "react-calendar";

import WalkerCard from "../components/Walker/WalkerCard";
import WalkerAppointments from "../components/Walker/WalkerAppointments";
import WalkerAvailabilty from "../components/Walker/WalkerAvailability";

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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <div className="allUserElements">
        <div className="userNav">
          <h1>Your Dog Walking Availability</h1>
          <div className="logoutAndHome">
            <Link to="/">
              <h2 className="logout" type="button" onClick={logout}>
                Logout /
              </h2>
            </Link>

            <Link to="/">
              <h2>Home</h2>
            </Link>
          </div>
        </div>
        <h1 className="blackBar">{user.username}</h1>
        <div className="walker-profile-card-container">
          <div className="walker-profile-top">
            <div className="walker-calendar-card">
              <div className="text">
                <h4>Walker Calendar:</h4>
                <Calendar onChange={onCalendarChange} value={calendarValue} />
              </div>
            </div>

            <WalkerCard user={user}></WalkerCard>
          </div>

          {userParam ? (
            "you can't view other's appointments"
          ) : (
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
