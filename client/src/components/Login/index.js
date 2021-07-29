import React, { useState } from "react";
import { Route } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="totalLayout">
      <div className="leftSwitchedLayout">
        <div className="blueOutline">
          <h1>
            Login to view your details and find dog walkers in your area.{" "}
          </h1>
        </div>
      </div>

      <div className="rightSwitchedLayout">
        <div className="alignFormAltered">
          <form className="alignSwitchedForm">
            <Route
              render={({ history }) => (
                <h1
                  type="button"
                  onClick={() => {
                    history.push("/SignUp");
                  }}
                >
                  Sign up Instead
                </h1>
              )}
            />
            <div className="mainDiv">
              <div className="controlDiv">
                <p>Email</p>
                {"\n"}
                <p>Password</p>
              </div>
              <div className="controlDiv">
                <input
                  type="text"
                  name="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              {error && <div>{error.toString()}</div>}
            </div>
          </form>
        </div>
        <div className="buttonDiv">
          <button
            className="greenSwitchedButton"
            type="submit"
            onClick={handleFormSubmit}
          >
            Login
          </button>
        </div>
      </div>

      <div className="bottomSwitchedBlue"></div>
    </section>
  );
}

export default Login;
