import { React, useState } from "react";
import { Route, useParams } from "react-router-dom";
import Calendar from "react-calendar";

import WalkerCard from "../components/WalkerCard";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

import Auth from "../utils/auth";

function DogWalker() {
  const { username: userParam } = useParams();

  const [value, onChange] = useState(new Date());

  const { loading, data, error } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // checks for both kinds of responses, either me or user
  const user = data?.me || data?.user || {};

  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="allUserElements">
        <div className="userNav">
          <h1>Your Dog Walking Availability</h1>
          <div className="logoutAndHome">
            <Route
              render={({ history }) => (
                <h2
                  className="logout"
                  type="button"
                  onClick={() => {
                    history.push("/Login");
                  }}
                >
                  Logout /
                </h2>
              )}
            />

            <Route
              render={({ history }) => (
                <h2
                  type="button"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Home
                </h2>
              )}
            />
          </div>
        </div>

        <h1 className="blackBar">{user.username}</h1>

        <div className="leftAndRight">
          <div className="leftSideUser">
            <div className="text">
              <h4>Your Calendar:</h4>
              <Calendar onChange={onChange} value={value} />
            </div>
          </div>

          <WalkerCard user={user}></WalkerCard>
        </div>

        <h4 className="yourDogs"></h4>
      </div>
      <div className="bottomOrange"></div>
    </div>
  );
}

export default DogWalker;
